import React from "react";
import "./searchInFiles.css";

import {
  SearchInput,
  SearchResults,
  getFileTree,
} from "@litecode-ide/virtual-file-system";
import "@litecode-ide/virtual-file-system/dist/style.css";
import { appStore } from "@/store/appStore";
import { getActiveFileProps } from "@/utils/editorConstants";

const SearchInFiles = () => {
  const updateVfsSearch = appStore((state) => state.updateVfsSearch); // global state

  const updateActiveFile = appStore(
    (state) => state.updateActiveFile
  );

  const getFileContents = (id) => {
    if (id === "") {
      return "";
    }

    const file = Object.values(getFileTree()).find(({ id: _id }) => _id === id);
    return file ? file.content : undefined;
  };

  const handleSearchResultClick = (id, line) => {
    if(!id) return
    const fileExt = getActiveFileProps(id) || "";

    updateVfsSearch({
      searchItemClick: true,
      searchLine: line
    })

    updateActiveFile({
      value: getFileContents(id),
      ext: fileExt?.ext,
      language: fileExt?.language,
      languageName: fileExt?.languageName
    });

    // editor.setSelection(new monaco.Selection(1,2,1,2));
    // editor.focus();
    
  };


  
  return (
    <div className="searchResCont">
      <SearchInput className="text-xs p-0.4 bg-neutral-500 text-neutral-300 hover:bg-neutral-600 active:bg-neutral-600 focus:bg-neutral-600" />
      <div className="searchResWrapper flex flex-col h-full w-1/4">
        <SearchResults
          searchResultClicked={(id, line) => handleSearchResultClick(id, line)}
        />
      </div>
    </div>
  );
};

export default SearchInFiles;
