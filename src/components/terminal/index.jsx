// 'use client'

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";

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

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const xtermInstance = useRef(null); 
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize the terminal
    const term = new Terminal(terminalOptions);
    xtermInstance.current = term;

    term.loadAddon(fitAddon.current);
    term.open(terminalRef.current);

    // Now call fitAddon.fit() after the terminal is opened
    // fitAddon.current.fit();


    term.writeln("Welcome to your custom terminal!");

    // Handle input from the user (e.g., compile command)
    term.onData((data) => {
      handleTerminalInput(data);
    });

    // Cleanup on component unmount
    return () => {
      if (xtermInstance.current) {
        xtermInstance.current.dispose();
      }
    };
  }, []);

  // Function to handle terminal commands
  const handleTerminalInput = (input) => {
    const command = input.trim();

    if (command === "clear") {
      xtermInstance.current.clear();
    } else {
      // Implement command handling logic
      xtermInstance.current.writeln(command);
    }
  };

  // Handle terminal resize on window resize
  useEffect(() => {
    const handleResize = () => {
      if (fitAddon.current) {
        fitAddon.current.fit();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ height: '300px', width: '100%', backgroundColor: '#000' }}
      id="terminal-container"
    ></div>
  );
};

export default TerminalComponent;
