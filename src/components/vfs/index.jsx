import {
    Breadcrumbs,
    FileExplorer,
    SearchInput,
    SearchResults,
    TabsList,
    getFileTree,
    updateFile,
    getSelectedFile,
  } from "@litecode-ide/virtual-file-system";
  import "@litecode-ide/virtual-file-system/dist/style.css";
  import { useState } from "react";
  import './vfs.css'
import { appStore } from "@/store/appStore";
  
  function VFS() {
    const updateActiveFileValue = appStore((state) => state.updateActiveFileValue); 
    // const [value, setValue] = useState("");
  
    // const updateFileContents = (e) => {
    //   setValue(e.target.value);
    //   updateFile(getSelectedFile(), e.target.value);
    // };

    const getFileContents = (id) => {
        if (id === "") {
          return "";
        }
        const file = Object.values(getFileTree()).find(({ id: fileId }) => fileId === id);
        return file ? file.content : undefined;
      };
      
  
    return (
      <div className="text-red">
        {/* <div className=""> */}
          {/* <SearchInput className="" /> */}
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
                  value: getFileContents(item.id)
                });
              }
            }}

            containerHeight="90%"
            folderClickableAreaClassName='text-white'
            folderThreeDotPrimaryClass='text-white'
            folderThreeDotSecondaryClass='text-white'
            fileActionsBtnClassName='ccb'
          />
        {/* </div> */}
        {/* <div className=""> */}
          {/* <TabsList
            onTabClick={(id) => setValue(getFileContents(id))}
            onTabClose={() => {
              setValue(getFileContents(getSelectedFile()))
            }}
          /> */}
          {/* <Breadcrumbs
            onBreadcrumbFileClick={(id) => setValue(getFileContents(id))}
          /> */}
          {/* <span className="text-zinc-500">
            Here is a text area which will be used to edit the contents of the
            opened file
          </span>
          <textarea
            onInput={updateFileContents}
            value={value}
            className="border"
            cols={30}
            rows={10}
          /> */}
        {/* </div> */}
        {/* <div className="flex flex-col h-full w-1/4">
          <SearchResults
            searchResultClicked={(id, line) =>
              setValue(getFileContents(id))
            }
          />
        </div> */}
      </div>
    );
  }
  
  export default VFS;
  