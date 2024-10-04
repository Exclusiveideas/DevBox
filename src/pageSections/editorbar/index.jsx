"use client"

import React, { useEffect, useState } from 'react';
import './editorbar.css'
import EditorComp from '@/components/editor';
import { appStore } from '@/store/appStore';

const EditorBar = ({ setMonacoInitialized }) => {
  const {ext: fileExt} = appStore((state) => state.activeFile); // global state
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
      {editorOpen ? <EditorComp setMonacoInitialized={setMonacoInitialized} /> : <SelectFile />}
    </div>
  )
}

export default EditorBar


const SelectFile = () => (
  <div className="selectAFileWrapper">
    <p>Select a file to continue</p>
  </div>
)