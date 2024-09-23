"use client"

import React from 'react';
import './structurebar.css'
import VFS from '@/components/vfs';
import { appStore } from '@/store/appStore';
import SearchInFiles from '@/components/searchInFiles';
import ConnectGitHub from '@/components/connectGitHub';

const StructureBar = () => {
  
  const { activeOpt } = appStore((state) => state.optionBar); // global state
  const updateActiveOptBar = appStore((state) => state.updateActiveOptBar);

  return (
    <div className='structurebarDiv'>
      {activeOpt == 0 && <VFS />}
      {activeOpt == 1 && <SearchInFiles />}
      {activeOpt == 2 && <ConnectGitHub />}
    </div>
  )
}

export default StructureBar