import React, { useState } from 'react'
import './searchInFiles.css'

import {
    SearchInput,
    SearchResults,
    getFileTree,
  } from "@litecode-ide/virtual-file-system";
  import "@litecode-ide/virtual-file-system/dist/style.css";
import { appStore } from '@/store/appStore';

const SearchInFiles = () => {
  const updateActiveFileValue = appStore(
    (state) => state.updateActiveFileValue
  );
    
  
    const getFileContents = (id) => {
      if (id === "") {
        return "";
      }

      const file = Object.values(getFileTree()).find(
        ({ id: _id }) => _id === id
      );
      return file ? file.content : undefined;
    };

  return (
    <div>
        <SearchInput className="bg-neutral-500 text-neutral-300 hover:bg-neutral-600 active:bg-neutral-600 focus:bg-neutral-600" />
        <div className="flex flex-col h-full w-1/4">
        <SearchResults
          searchResultClicked={(id, line) =>
            updateActiveFileValue({
              value: getFileContents(id),
            })
          }
        />
      </div>
    </div>
  )
}

export default SearchInFiles