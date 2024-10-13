"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "xterm/css/xterm.css";
import "./terminal.css";
import { io } from "socket.io-client";
import { appStore } from "@/store/appStore";
import { getFileTree } from "../../lib/my-modified-modules/litecode-ide-mod/dist/@litecode-ide/virtual-file-system.es";

const terminalOptions = {
  cursorBlink: true,
  convertEol: true,
  theme: {
    foreground: "#f8f8f2",
    cyan: "#8be9fd",
    green: "#50fa7b",
    yellow: "#f1fa8c",
    red: "#ff5555",
    cursor: "#f8f8f2",
    cursorAccent: "#282a36",
  },
  fontSize: 14,
};

const DevBoxServer = process.env.NEXT_PUBLIC_DEVBOX_SERVER;

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const xtermInstance = useRef(null);
  const buffer = useRef(""); // To store the current line of input
  const socketRef = useRef(null);
  const activeFileValRef = useRef(appStore((state) => state.activeFile));

  const { value: activeFileValue } = appStore((state) => state.activeFile);
  const updatePreviewTab = appStore((state) => state.updatePreviewTab);

  useEffect(() => {
    activeFileValRef.current = activeFileValue;
  }, [activeFileValue]);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize the terminal
    const term = new Terminal(terminalOptions);

    xtermInstance.current = term;

    // Initialize socket connection to your backend server
    socketRef.current = io(DevBoxServer);

    term.open(terminalRef.current);
    term.writeln("> Terminal");
    term.write("> ");

    term.attachCustomKeyEventHandler((event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault(); // Prevent default behavior
        return false; // Stop propagation
      }
      return true; // Allow other keys
    });

    socketRef.current.on("connect", () => {
      // console.log("socket.id: ", socketRef.current.id);
    });

    // Handle input from the user (e.g., compile command)
    term.onData((data) => {
      handleTerminalInput(data, term);
    });

    const handleOutput = (data) => {
      const convertedData = Buffer.from(data, "base64").toString();
      term.write(convertedData);
      term.writeln("");
      term.write("> ");
    };

    // Ensure no duplicate listeners by cleaning up any existing ones first
    socketRef.current.off("output", handleOutput); // Remove the listener first if it exists
    socketRef.current.on("output", handleOutput); // Add the listener for "output"

    return () => {
      if (xtermInstance.current) {
        xtermInstance.current.dispose();
      }

      socketRef.current.disconnect(); // Cleanup socket connection
    };
  }, []);

  function handleTerminalInput(data, term) {
    const code = data.charCodeAt(0);
    switch (code) {
      case 13: // Enter
        term.write("\r\n");
        handleEnterKey(buffer.current, term);
        buffer.current = "";
        term.write("> ");
        break;
      case 127: // Backspace
        if (buffer.current.length > 0) {
          buffer.current = buffer.current.slice(0, -1);
          // Move cursor back, clear the last character, and move back again
          term.write("\b \b");
        }
        break;
      case 32: // Space
        buffer.current += " ";
        term.write(" ");
        break;
      default:
        // For all other characters, add them to the buffer and terminal
        buffer.current += data;
        term.write(data);
        break;
    }
  }

  function handleEnterKey(command, term) {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    switch (trimmedCommand) {
      case "clear":
        term.clear();
        term.writeln("> Terminal");
        break;
      case "compile":
        if (activeFileValRef.current) {
          term.writeln("> Compiling Active File... (give it a few more seconds, it's a free service)");
          sendCompileCommand(activeFileValRef.current);
        } else {
          term.writeln(
            "> Nothing to compile: Make sure your file is open and active"
          );
        }
        break;
      default:
        if (trimmedCommand.startsWith("render")) {
          // Extract the text after "render"
          const renderPath = trimmedCommand.slice("render".length).trim();

          if (renderPath) {
            renderFilePath(renderPath, term);
          } else {
            term.writeln("> Please provide a path to render");
          }
        } else {
          term.writeln(`> Command not recognized: ${trimmedCommand}`);
        }
        break;
    }
  }

  const sendCompileCommand = (code) => {
    const encodedCommand = btoa(code);
    socketRef.current.emit("input", encodedCommand); // Send input to the backend
  };

  const renderFilePath = (path, term) => {
    if (!path.endsWith(".html")) {
      term.writeln("> Devbox can only render .html files");
      return;
    }

    const tree = getFileTree();
    let pathExist = false;

    for (let key in tree) {
      if (tree.hasOwnProperty(key) && key == path) {
        // Check if the property is not inherited
        pathExist = true;
        term.writeln(`> Rendering ${path} ...`);

        updatePreviewTab({
          open: true,
          renderContent: tree[key].content,
        });
        return;
      }
    }

    if (!pathExist) {
      term.writeln(`${path} does not exist`);
      term.writeln(
        `Tip: start from the top directory "/" i.e render /folder1/xxx.html`
      );
    }
  };

  return <div ref={terminalRef} id="terminal-container"></div>;
};

export default TerminalComponent;