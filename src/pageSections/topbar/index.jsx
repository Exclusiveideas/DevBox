"use client"


import React from "react";
import "./topbar.css";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuPopperOne from "@/components/menuPopper/menuPopperOne";
import { appStore } from "@/store/appStore";



const TopBar = () => {
  
  const activeFile = appStore((state) => state.activeFile) // global state
  const { openTopBarMenuOne: openMenuPopperOne } = appStore((state) => state.menuPopperOpts) // global state
  const updateMenuPopperOpts = appStore((state) => state.updateMenuPopperOpts); // global state

  const anchorRefOne = React.useRef(null);
  
  const handleToggleMenuOne = () => {
    updateMenuPopperOpts({
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
        />
      </div>
      <div className="topbarMidCont">
        <div data-intro='This shows the current file type you are editing' data-step={2} className="languageBox">
          <p>DevBox / {activeFile?.languageName}</p>
        </div>
      </div>
      <div className="topbarRightCont">
        <div className="userIcon">
          <p>A</p>
        </div>
        <div className="topbuttons shareButton topbarShare">
          <p>Share</p>
        </div>
        <div className="topbuttons topbarSignIn" data-intro='[⚠️Feature Not Available yet] Click here to create an account' data-step={7}>
          <p>Sign In</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;