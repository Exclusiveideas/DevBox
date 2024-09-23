"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import EditorBackDrop from "../editorBackdrop";
import { editorThemes } from "@/utils/editorContants";
import { appStore } from "@/store/appStore";
import "./editor.css";
import {
  Breadcrumbs,
  TabsList,
  getFileTree,
  updateFile,
  getSelectedFile,
} from "@litecode-ide/virtual-file-system";
import "@litecode-ide/virtual-file-system/dist/style.css";

const EditorComp = () => {
  const monaco = useMonaco();
  const { theme } = appStore((state) => state.editorOpts); // global state
  const { value: vfsStateValue } = appStore((state) => state.vfsState); // global state
  const updateVFSStateValue = appStore((state) => state.updateVFSStateValue);
  const { value: activeFileValue } = appStore((state) => state.activeFile); // global state
  const updateActiveFileValue = appStore(
    (state) => state.updateActiveFileValue
  );

  const handleEditorChange = (value) => {
    updateActiveFileValue({
      value: value,
    });

    updateFile(getSelectedFile(), value);
  };

  const updateFileContents = (e) => {
    updateFile(getSelectedFile(), e.target.value);
  };

  useEffect(() => {
    if (!monaco) return;

    // set default theme
    if (theme) monaco.editor.setTheme(theme);

    monaco.editor.defineTheme("ace", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "", foreground: "5c6773" },
        { token: "invalid", foreground: "ff3333" },
        { token: "emphasis", fontStyle: "italic" },
        { token: "strong", fontStyle: "bold" },
        { token: "variable", foreground: "5c6773" },
        { token: "variable.predefined", foreground: "5c6773" },
        { token: "constant", foreground: "f08c36" },
        { token: "comment", foreground: "abb0b6", fontStyle: "italic" },
        { token: "number", foreground: "f08c36" },
        { token: "number.hex", foreground: "f08c36" },
        { token: "regexp", foreground: "4dbf99" },
        { token: "annotation", foreground: "41a6d9" },
        { token: "type", foreground: "41a6d9" },
        { token: "delimiter", foreground: "5c6773" },
        { token: "delimiter.html", foreground: "5c6773" },
        { token: "delimiter.xml", foreground: "5c6773" },
        { token: "tag", foreground: "e7c547" },
        { token: "tag.id.jade", foreground: "e7c547" },
        { token: "tag.class.jade", foreground: "e7c547" },
        { token: "meta.scss", foreground: "e7c547" },
        { token: "metatag", foreground: "e7c547" },
        { token: "metatag.content.html", foreground: "86b300" },
        { token: "metatag.html", foreground: "e7c547" },
        { token: "metatag.xml", foreground: "e7c547" },
        { token: "metatag.php", fontStyle: "bold" },
        { token: "key", foreground: "41a6d9" },
        { token: "string.key.json", foreground: "41a6d9" },
        { token: "string.value.json", foreground: "86b300" },
        { token: "attribute.name", foreground: "f08c36" },
        { token: "attribute.value", foreground: "0451A5" },
        { token: "attribute.value.number", foreground: "abb0b6" },
        { token: "attribute.value.unit", foreground: "86b300" },
        { token: "attribute.value.html", foreground: "86b300" },
        { token: "attribute.value.xml", foreground: "86b300" },
        { token: "string", foreground: "86b300" },
        { token: "string.html", foreground: "86b300" },
        { token: "string.sql", foreground: "86b300" },
        { token: "string.yaml", foreground: "86b300" },
        { token: "keyword", foreground: "f2590c" },
        { token: "keyword.json", foreground: "f2590c" },
        { token: "keyword.flow", foreground: "f2590c" },
        { token: "keyword.flow.scss", foreground: "f2590c" },
        { token: "operator.scss", foreground: "666666" }, //
        { token: "operator.sql", foreground: "778899" }, //
        { token: "operator.swift", foreground: "666666" }, //
        { token: "predefined.sql", foreground: "FF00FF" }, //
      ],
      colors: {
        "editor.background": "#fafafa",
        "editor.foreground": "#5c6773",
        "editorIndentGuide.background": "#ecebec",
        "editorIndentGuide.activeBackground": "#e0e0e0",
      },
    });

    // add the newly defined themes to the list of registered Themes
    editorThemes?.push("ace");
  }, [monaco, theme]);

  const updateFileValue = (fileValue) => {
    updateActiveFileValue({
      value: fileValue,
    });
  };

  const getFileContents = (id) => {
    if (id === "") {
      return "";
    }

    const file = Object.values(getFileTree()).find(({ id: _id }) => _id === id);
    return file ? file.content : undefined;
  };

  return (
    <div className="EditorCompWrapper">
      <div className="TablistWrapper">
        <TabsList
          onTabClick={(id) => updateFileValue(getFileContents(id))}
          onTabClose={() => {
            updateFileValue(getFileContents(getSelectedFile()));
          }}
          containerClassName='min-h-max gap-4'
          tabClassName="min-h-max w-30 p-10px text-xs mr-10px"
        />
        <Breadcrumbs
          onBreadcrumbFileClick={(id) => updateFileValue(getFileContents(id))}
        />
      </div>
      <div className="monacoEditorWrapper">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={""}
          value={activeFileValue}
          theme="vs-dark"
          onChange={handleEditorChange}
        />
        <EditorBackDrop />
      </div>
    </div>
  );
};

export default EditorComp;
