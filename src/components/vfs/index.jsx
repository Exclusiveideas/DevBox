import {
  FileExplorer,
  getFileTree,
} from "@litecode-ide/virtual-file-system";
import "@litecode-ide/virtual-file-system/dist/style.css";
import "./vfs.css";
import { appStore } from "@/store/appStore";

function VFS() {
  const updateActiveFileValue = appStore(
    (state) => state.updateActiveFileValue
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

  return (
    <div className="text-red">
      <FileExplorer
        validExtensions={[
          "js",
          "ts",
          "tsx",
          "jsx",
          "json",
          "md",
          "css",
          "txt",
          "html",
        ]}
        // projectName="My awesome project"

        onItemSelected={(item) => {
          if (item.type === "file") {
            updateActiveFileValue({
              value: getFileContents(item.id),
            });
          }
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
