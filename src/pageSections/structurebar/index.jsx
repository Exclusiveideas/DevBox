"use client"

import React from 'react';
import './structurebar.css'
// import VFS from '@/components/vfs';
import { appStore } from '@/store/appStore';
import SearchInFiles from '@/components/searchInFiles';
import ConnectGitHub from '@/components/connectGitHub';
import dynamic from 'next/dynamic';


const VFS = dynamic(() => import("@/components/vfs"), { ssr: false });

const StructureBar = () => {
  
  const { activeOpt } = appStore((state) => state.optionBar); // global state

  return (
    <div className='structurebarDiv vfs_tour' >
      {activeOpt == 0 && <VFS />}
      {activeOpt == 1 && <SearchInFiles />}
      {activeOpt == 2 && <ConnectGitHub />}
    </div>
  )
}

export default StructureBar