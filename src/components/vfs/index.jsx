"use client";

import React, { useEffect, useState } from "react";
import { getFileTree, FileExplorer } from "@litecode-ide/virtual-file-system";
import "@litecode-ide/virtual-file-system/dist/style.css";
import "./vfs.css";
import { appStore } from "@/store/appStore";
import { editorFileExtensions, getActiveFileProps } from "@/utils/editorConstants";
import ReactDOM from "react-dom";

function VFS() {
  const updateActiveFile = appStore((state) => state.updateActiveFile);
  const [targetContainer, setTargetContainer] = useState(null);

  useEffect(() => {
    const container = document.getElementById("context-menu-container");
    if (container) {
      setTargetContainer(container);
    }
  }, []);

  const getFileContents = (id) => {
    if (id === "") {
      return "";
    }
    const file = Object.values(getFileTree()).find(({ id: fileId }) => fileId === id);
    return file ? file.content : undefined;
  };

  const handleFileSelect = (item) => {
    const fileExt = getActiveFileProps(item.id) || "";

    updateActiveFile({
      value: getFileContents(item.id),
      ext: fileExt?.ext,
      language: fileExt?.language,
      languageName: fileExt?.languageName,
    });
  };

  const handleRightClick = (event, item) => {
    event.preventDefault();
    if (targetContainer) {
      // ReactDOM.render(<ContextMenu item={item} />, targetContainer);
    }
  };

  const handleContextMenu = (item, event) => {
    event.preventDefault();
    handleRightClick(event, item);
  };

  return (
    <div className="text-white">
      <FileExplorer
        validExtensions={editorFileExtensions}
        // projectName="My awesome project"
        onItemSelected={(item) => {
          if (item.type === "file") handleFileSelect(item);
        }}
        containerHeight="90%"
        folderClickableAreaClassName="text-white"
        folderThreeDotPrimaryClass="text-white"
        folderThreeDotSecondaryClass="text-white"
        fileActionsBtnClassName="ccb"
        onItemContextSelected={handleContextMenu}
      />
      <div id="context-menu-container"></div>
    </div>
  );
}

export default VFS;
