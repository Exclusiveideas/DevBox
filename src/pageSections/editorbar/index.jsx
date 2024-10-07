"use client"

import React, { useEffect, useState } from 'react';
import './editorbar.css'
import EditorComp from '@/components/editor';
import { appStore } from '@/store/appStore';
import { ClockLoader as Loader } from "react-spinners";
import Editor from "@monaco-editor/react";
import TerminalComponent from '@/components/terminal';
import CloseIcon from "@mui/icons-material/Close";

const EditorBar = () => {
  const {ext: fileExt} = appStore((state) => state.activeFile); // global state
  const { open: terminalOpen } = appStore((state) => state.terminal); // global state
  const { tourDemo } = appStore((state) => state.editorOpts); // global state
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    if(fileExt) {
      setEditorOpen(true)
    } else {
      setEditorOpen(false)
    }
  }, [fileExt])
  

  return (
    <div className='editorCompWrapper'>
      {editorOpen ? <EditorComp /> : (tourDemo ? <DemoEditor terminalOpen={terminalOpen} /> : <SelectFile />)}
    </div>
  )
}

export default EditorBar


const SelectFile = () => (
  <div className="selectAFileWrapper">
    <p>Select a file to continue</p>
  </div>
)  

const DemoEditor = ({ terminalOpen }) => (
  <div className="demoEditorWrapper containerDiv">
  <div className='demoEditor' style={{ height: terminalOpen ? "65%" : "100%" }}>
    <Editor
      loading={<Loader color="white" />}
      value={`console.log('Hello world')`}
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      language="javascript"
    />
  </div>
  <div className="terminalWrapper demoTerminal">
  <div className="closeTermDiv">
    <div className="titleWrapper terminal">
      <p>Terminal</p>
      <CloseIcon
        sx={{
          color: "white",
          cursor: "pointer",
          fontSize: "15px",
        }}
      />
    </div>
  </div>
  <div className="terminalDiv">
    <TerminalComponent />
  </div>
</div>
</div>
);