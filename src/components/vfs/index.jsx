import {
  FileExplorer,
  getFileTree,
} from "@litecode-ide/virtual-file-system";
import "@litecode-ide/virtual-file-system/dist/style.css";
import "./vfs.css";
import { appStore } from "@/store/appStore";

import * as monaco from 'monaco-editor';
import { editorFileExtensions, getActiveFileExt, languageOptions } from "@/utils/editorConstants";

function VFS() {
  const updateActiveFile = appStore(
    (state) => state.updateActiveFile
  );
  const getFileContents = (id) => {
    if (id === "") {
      return "";
    }
    const file = Object.values(getFileTree()).find(
      ({ id: fileId }) => fileId === id
    );

    return file ? file.content : undefined;
  };
  
const handleFileSelect = (item) => {
  const fileExt = getActiveFileExt(item.id) || '';

  updateActiveFile({
    value: getFileContents(item.id),
    ext: fileExt
  });
}

  return (
    <div className="text-red">
      <FileExplorer
        validExtensions={editorFileExtensions}
        // projectName="My awesome project"

        onItemSelected={(item) => {
          if (item.type === "file") handleFileSelect(item)
          }}
        containerHeight="90%"
        folderClickableAreaClassName="text-white"
        folderThreeDotPrimaryClass="text-white"
        folderThreeDotSecondaryClass="text-white"
        fileActionsBtnClassName="ccb"
      />
    </div>
  );
}

export default VFS;
