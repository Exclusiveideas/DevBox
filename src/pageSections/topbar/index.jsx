"use client"


import React from "react";
import "./topbar.css";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuPopperOne from "@/components/menuPopper/menuPopperOne";
import { appStore } from "@/store/appStore";
import { editorFileLanguage } from "@/utils/editorConstants";
import dynamic from "next/dynamic";



const menuSpecials = {
  menuTwoWithExpand: [],

  menuTwoPreIcon: [], // work on this later,

  menuTwoDisabled: [],
}; 


const TopBar = () => {
  
  const activeFile = appStore((state) => state.activeFile) // global state
  const menuPopperOpts = appStore((state) => state.menuPopperOpts) // global state
  const updateTopBarMenuOne = appStore((state) => state.updateTopBarMenuOne); // global state
  const openMenuPopperOne = menuPopperOpts?.openTopBarMenuOne;

  const anchorRefOne = React.useRef(null);
  
  const handleToggleMenuOne = () => {
      updateTopBarMenuOne({
        openTopBarMenuOne: !openMenuPopperOne,
      });
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMenuPopperOne);
  React.useEffect(() => {
    if (prevOpen?.current === true && openMenuPopperOne === false) {
      anchorRefOne.current.focus();
    }

    prevOpen.current = openMenuPopperOne;
  }, [openMenuPopperOne]);

  

  return (
    <div className="topbar">
      <div className="topbarLeftCont">
        <Image src="/logo.png" width={60} height={38} alt="DevBox logo" />
        <ExpandMoreIcon
          sx={{ color: "white", cursor: "pointer", width: "15px" }}

          ref={anchorRefOne}
          id="menu-one-button"
          aria-controls={openMenuPopperOne ? "menu-one-list" : undefined}
          aria-expanded={openMenuPopperOne ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggleMenuOne}
        />
        <MenuPopperOne
          anchorRefOne={anchorRefOne}
          pos="topbar"
          menuSpecials={menuSpecials}
        />
      </div>
      <div className="topbarMidCont">
        <div className="languageBox">
          <p>DevBox / {activeFile?.languageName}</p>
        </div>
      </div>
      <div className="topbarRightCont">
        <div className="userIcon">
          <p>A</p>
        </div>
        <div className="topbuttons shareButton">
          <p>Share</p>
        </div>
        <div className="topbuttons">
          <p>Sign In</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;