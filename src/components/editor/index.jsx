"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import EditorBackDrop from "../editorBackdrop";
import { editorThemes, getActiveFileProps } from "@/utils/editorConstants";
import { appStore } from "@/store/appStore";
import CloseIcon from "@mui/icons-material/Close";
import "./editor.css";
import {
  // Breadcrumbs,
  TabsList,
  getFileTree,
  updateFile,
  getSelectedFile,
} from "@litecode-ide/virtual-file-system";
import "@litecode-ide/virtual-file-system/dist/style.css";
import { debounce } from "@/utils/functions";
import dynamic from "next/dynamic";
import { ClockLoader as Loader } from "react-spinners";

const TerminalComponent = dynamic(() => import("../terminal"), { ssr: false });

const EditorComp = () => {
  const editorOpts = appStore((state) => state.editorOpts); // global state
  const { open: terminalOpen } = appStore((state) => state.terminal); // global state
  const activeFile = appStore((state) => state.activeFile); // global state
  const updateActiveFile = appStore((state) => state.updateActiveFile);
  const updateTerminal = appStore((state) => state.updateTerminal);
  
  const updateEditorOpts = appStore((state) => state.updateEditorOpts); // global state

  const [jumpToLine, setJumpToLine] = useState(0);
  const [vars, setVars] = useState({});
  const { monacoEditor, monaco } = vars;

  const handleEditorChange = (value) => {
    
    updateActiveFile({ ...activeFile, 
      value: value,
    });


    if (!getSelectedFile()) {
      return; // no active file
    }

    // Debounced function to update file content
    const debouncedSave = debounce(() => {
      const selectedFile = getSelectedFile()
      if(selectedFile) updateFile(getSelectedFile(), value);
    }, 1000); // 1 sec delay

    // Trigger the debounced function
    debouncedSave();
  };

  useEffect(() => {
    if (!monaco) return;

    // set default theme
    if (editorOpts?.theme) monaco.editor.setTheme(editorOpts?.theme);

    monaco.editor.defineTheme("ace", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "", foreground: "5c6773" },
        { token: "invalid", foreground: "ff3333" },
        { token: "emphasis", fontStyle: "italic" },
        { token: "strong", fontStyle: "bold" },
        { token: "variable", foreground: "5c6773" },
        { token: "variable.predefined", foreground: "5c6773" },
        { token: "constant", foreground: "f08c36" },
        { token: "comment", foreground: "abb0b6", fontStyle: "italic" },
        { token: "number", foreground: "f08c36" },
        { token: "number.hex", foreground: "f08c36" },
        { token: "regexp", foreground: "4dbf99" },
        { token: "annotation", foreground: "41a6d9" },
        { token: "type", foreground: "41a6d9" },
        { token: "delimiter", foreground: "5c6773" },
        { token: "delimiter.html", foreground: "5c6773" },
        { token: "delimiter.xml", foreground: "5c6773" },
        { token: "tag", foreground: "e7c547" },
        { token: "tag.id.jade", foreground: "e7c547" },
        { token: "tag.class.jade", foreground: "e7c547" },
        { token: "meta.scss", foreground: "e7c547" },
        { token: "metatag", foreground: "e7c547" },
        { token: "metatag.content.html", foreground: "86b300" },
        { token: "metatag.html", foreground: "e7c547" },
        { token: "metatag.xml", foreground: "e7c547" },
        { token: "metatag.php", fontStyle: "bold" },
        { token: "key", foreground: "41a6d9" },
        { token: "string.key.json", foreground: "41a6d9" },
        { token: "string.value.json", foreground: "86b300" },
        { token: "attribute.name", foreground: "f08c36" },
        { token: "attribute.value", foreground: "0451A5" },
        { token: "attribute.value.number", foreground: "abb0b6" },
        { token: "attribute.value.unit", foreground: "86b300" },
        { token: "attribute.value.html", foreground: "86b300" },
        { token: "attribute.value.xml", foreground: "86b300" },
        { token: "string", foreground: "86b300" },
        { token: "string.html", foreground: "86b300" },
        { token: "string.sql", foreground: "86b300" },
        { token: "string.yaml", foreground: "86b300" },
        { token: "keyword", foreground: "f2590c" },
        { token: "keyword.json", foreground: "f2590c" },
        { token: "keyword.flow", foreground: "f2590c" },
        { token: "keyword.flow.scss", foreground: "f2590c" },
        { token: "operator.scss", foreground: "666666" }, //
        { token: "operator.sql", foreground: "778899" }, //
        { token: "operator.swift", foreground: "666666" }, //
        { token: "predefined.sql", foreground: "FF00FF" }, //
      ],
      colors: {
        "editor.background": "#fafafa",
        "editor.foreground": "#5c6773",
        "editorIndentGuide.background": "#ecebec",
        "editorIndentGuide.activeBackground": "#e0e0e0",
      },
    });

    // add the newly defined themes to the list of registered Themes
    editorThemes?.push("ace");
  }, [monaco, editorOpts?.theme]);

  useEffect(() => {
    const fileId = getSelectedFile();
    updateFileValue(fileId, getFileContents(fileId));
  }, []);

  const updateFileValue = (id, fileValue) => {
    if (!id) {
      updateActiveFile({ 
        value: null,
        ext: '',
        language: '',
        languageName: '' 
      });

      return;
    }

    const fileExt = getActiveFileProps(id) || "";

    updateActiveFile({
      value: fileValue,
      ext: fileExt?.ext,
      language: fileExt?.language,
      languageName: fileExt?.languageName,
    });
  };

  const getFileContents = (id) => {
    if (id === "") {
      return "";
    }

    const file = Object.values(getFileTree()).find(({ id: _id }) => _id === id);
    return file ? file.content : undefined;
  };

  const closeTerminal = () => {
    updateTerminal({
      open: false,
    });
  };

  useEffect(() => {
    // for higlighting search text on the editor
    
    if (
      !editorOpts?.searchItemClick ||
      !editorOpts?.searchLine ||
      !monacoEditor ||
      !monaco
    )
      return;

    setJumpToLine(editorOpts?.searchLine);

    monacoEditor.createDecorationsCollection([
      {
        range: new monaco.Range(editorOpts?.searchLine, 1, editorOpts?.searchLine, 1),
        options: {
          isWholeLine: true,
          linesDecorationsClassName: "myLineDecoration",
        },
      },
      {
        range: new monaco.Range(editorOpts?.searchLine, 1, editorOpts?.searchLine, 10),
        options: { isWholeLine: true, inlineClassName: "myInlineDecoration", },
      },
    ]);

    updateEditorOpts({
      searchItemClick: false,
      searchLine: null,
    });
  }, [monacoEditor, monaco, editorOpts?.searchItemClick]);
    

  async function handleEditorDidMount(monacoEditor, monaco) {
    setVars({ monacoEditor, monaco });
  }



  return (
    <div className="EditorCompWrapper">
      <div className="TablistWrapper">
        <TabsList
          onTabClick={(id) => updateFileValue(id, getFileContents(id))}
          onTabClose={() => {
            updateFileValue(
              getSelectedFile(),
              getFileContents(getSelectedFile())
            );
          }}
          containerClassName="min-h-max gap-4"
          tabClassName="min-h-max w-30 p-10px text-xs mr-10px"
        />
        {/* <Breadcrumbs
          onBreadcrumbFileClick={(id) => updateFileValue(getFileContents(id))}
        /> */}
      </div>
      <div className="containerDiv">
        <div style={{ height: terminalOpen ? "70%" : "100%" }}>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={""}
            value={activeFile?.value} 
            theme="vs-dark"
            onChange={handleEditorChange}
            language={`${activeFile?.language}`}
            onMount={handleEditorDidMount}
            line={jumpToLine}
            loading={<Loader color='white' />}
          />
          <EditorBackDrop />
        </div>
        {terminalOpen && (
          <div className="terminalWrapper">
            <div className="closeTermDiv">
              <div className="titleWrapper terminal">
                <p>Terminal</p>
                <CloseIcon
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                  onClick={closeTerminal}
                />
              </div>
            </div>
            <div className="terminalDiv">
              <TerminalComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorComp;
