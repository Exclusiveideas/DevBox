"use client";

import React, { useEffect, useRef, useState } from "react";
import "./optionsbar.css";

import MenuIcon from "@mui/icons-material/Menu";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuPopperOne from "@/components/menuPopper/menuPopperOne";
import { appStore } from "@/store/appStore";



const menuSpecials = {
  menuTwoWithExpand: ["Appearance", "Editor Layout"],

  menuTwoPreIcon: ["Auto Save", "Confirm Before Close"], // work on this later,

  menuTwoDisabled: ["Forward", "Last Edit Location"],
}; 

const OptionBar = () => {
  
  const menuPopperOpts = appStore((state) => state.menuPopperOpts) // global state
  const updateOptBarMenuOne = appStore((state) => state.updateOptBarMenuOne); // global state
  const openMenuPopperOne = menuPopperOpts?.openOptBarMenuOne


  const [activeOpt, setactiveOpt] = useState(0);
  const anchorRefOne = useRef(null);

  const handleToggleMenuOne = () => {
      updateOptBarMenuOne({
        openOptBarMenuOne: !openMenuPopperOne,
      });
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openMenuPopperOne);
  useEffect(() => {
    if (prevOpen?.current === true && openMenuPopperOne === false) {
      anchorRefOne.current.focus();
    }

    prevOpen.current = openMenuPopperOne;
  }, [openMenuPopperOne]);


  return (
    <div className="optionsBar">
      <div className="topOptions">
        {Array(4)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className={`optionDiv ${activeOpt == i && "active"}`}
              onClick={() => setactiveOpt(i)}
            >
              {i == 0 && (
                <div className="optionIcon">
                  <MenuIcon
                    ref={anchorRefOne}
                    id="menu-one-button"
                    aria-controls={openMenuPopperOne ? "menu-one-list" : undefined}
                    aria-expanded={openMenuPopperOne ? "true" : undefined}
                    aria-haspopup="true"
                    sx={{
                      color: `${
                        activeOpt == i ? "white" : "rgba(195, 195, 195, 0.934)"
                      }`,
                      cursor: "pointer",
                      width: "40px",
                    }}
                    onClick={() => {
                      handleToggleMenuOne();
                      setactiveOpt(i);
                    }}
                  />
                  <MenuPopperOne
                    anchorRefOne={anchorRefOne}
                    menuSpecials={menuSpecials}
                    pos="optionbar"
                  />
                </div>
              )}
              {i == 1 && (
                <div className="optionIcon">
                  <FileCopyIcon
                    sx={{
                      color: `${
                        activeOpt == i ? "white" : "rgba(195, 195, 195, 0.934)"
                      }`,
                      cursor: "pointer",
                      width: "40px",
                    }}
                    onClick={() => setactiveOpt(i)}
                  />
                </div>
              )}
              {i == 2 && (
                <div className="optionIcon">
                  <SearchIcon
                    sx={{
                      color: `${
                        activeOpt == i ? "white" : "rgba(195, 195, 195, 0.934)"
                      }`,
                      cursor: "pointer",
                      width: "40px",
                    }}
                    onClick={() => setactiveOpt(i)}
                  />
                </div>
              )}
              {i == 3 && (
                <div className="optionIcon">
                  <GitHubIcon
                    sx={{
                      color: `${
                        activeOpt == i ? "white" : "rgba(195, 195, 195, 0.934)"
                      }`,
                      cursor: "pointer",
                      width: "40px",
                    }}
                    onClick={() => setactiveOpt(i)}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="bottomOptions">
        <AccountCircleOutlinedIcon
          sx={{ color: "white", cursor: "pointer", width: "40px" }}
        />
        <SettingsOutlinedIcon
          sx={{ color: "white", cursor: "pointer", width: "40px" }}
        />
      </div>
    </div>
  );
};

export default OptionBar;






