import React, { useState } from "react";
import "./editorBackdrop.css";
import { Backdrop, List, ListItemButton, ListItemText } from "@mui/material";
import { appStore } from "@/store/appStore";
import { defineTheme, monacoThemes } from "@/utils/editorConstants";

const EditorBackDrop = () => {
  const themesList = Object.entries(monacoThemes).map(([themeId, themeName]) => themeId)
  const [searchTheme, setSearchTheme] = useState("");
  const [filteredThemes, setFilteredThemes] = useState(themesList);

  const { openBackdrop } = appStore((state) => state.editorOpts);
  const updateEditorOpts = appStore((state) => state.updateEditorOpts);



  const handleItemClick = (e) => {
    const selectedTheme = e?.target.textContent;

    if (["light", "vs-dark"].includes(selectedTheme)) {
      updateEditorOpts({
        theme: selectedTheme,
      });
    } else {
      defineTheme(selectedTheme).then((_) => {
        updateEditorOpts({
          theme: selectedTheme,
        });
      })
    }

    // close backdrop
    updateEditorOpts({
      openBackdrop: false,
    });
  };


  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTheme(searchTerm);

    const filteredThemez = themesList.filter((theme) =>
      theme.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredThemes(filteredThemez);
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={openBackdrop}
      invisible={true}
    >
      <div className="themeSelectorCont">
        <div className="searchCont">
          <input
            type="text"
            value={searchTheme}
            onChange={handleInputChange}
            placeholder="Type to search..."
            className="searchBar"
          />
        </div>
        <div className="themesList">
          <List
            sx={{ width: "100%", height: "100%", bgcolor: "transparent" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {filteredThemes?.map((theme, i) => (
              <ListItemButton onClick={handleItemClick} key={i}>
                <ListItemText
                  sx={{ fontSize: 10, fontWeight: 300 }}
                  primary={`${theme}`}
                />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
    </Backdrop>
  );
};

export default EditorBackDrop;
