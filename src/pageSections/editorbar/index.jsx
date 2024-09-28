import React from 'react';
import './editorbar.css'
import EditorComp from '@/components/editor';
import { appStore } from '@/store/appStore';

const EditorBar = ({ position }) => {
  const previewTab = appStore((state) => state.previewTab);

  return (
    // <div style={{ width: previewTab.open ? '70%': '100%', }} className='editorCompWrapper'>
    <div style={{ width: `calc(100% - ${position}px)` }} className='editorCompWrapper'>
      <EditorComp />
    </div>
  )
}

export default EditorBar