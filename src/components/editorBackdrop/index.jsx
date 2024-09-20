import React, { useState } from "react";
import "./editorBackdrop.css";
import {
  Backdrop,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { appStore } from "@/store/appStore";
import { editorThemes } from "@/utils/editorContants";

const EditorBackDrop = () => {
  
  const [searchTheme, setSearchTheme] = useState('');
  const [filteredThemes, setFilteredThemes] = useState(editorThemes)

  const { openBackdrop } = appStore((state) => state.editorOpts);
  const { theme } = appStore((state) => state.editorOpts);
  const updateEditorBackdrop = appStore((state) => state.updateEditorBackdrop);
  const updateEditorTheme = appStore((state) => state.updateEditorTheme);

  const handleItemClick = (e) => {
    const selectedTheme = e?.target.textContent

    // update global state
    updateEditorTheme({
      theme: selectedTheme,
    });

    // Switch to another theme
    monaco.editor.setTheme(selectedTheme);

    // close backdrop
    updateEditorBackdrop({
      openBackdrop: false,
    });
  };

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchTheme(searchTerm)

    const filteredThemez = editorThemes.filter((theme) =>
        theme.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredThemes(filteredThemez);
  }

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={openBackdrop}
      onClick={handleItemClick}
      invisible={true}
    >
      <div className="themeSelectorCont">
        <div className="searchCont">      
      <input
        type="text"
        value={searchTheme}
        onChange={handleInputChange}
        placeholder='Type to search...'
        className="searchBar"
      />
    </div>
        <List
          sx={{ width: "100%", height: "100%", bgcolor: "transparent" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {filteredThemes?.map((theme, i) => (
            <ListItemButton key={i}>
              <ListItemText sx={{ fontSize: 10, fontWeight: 300}} primary={`${theme}`} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Backdrop>
  );
};

export default EditorBackDrop;
