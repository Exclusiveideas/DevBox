"use client"


import React from "react";
import "./topbar.css";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuPopperOne from "@/components/menuPopper/menuPopperOne";





const menuSpecials = {
  menuTwoWithExpand: [],

  menuTwoPreIcon: [], // work on this later,

  menuTwoDisabled: [],
}; 


const TopBar = () => {
  const languageSelect = "JavaScript";
  
  var ind = 1;
  
  const [openMenuOne, setOpenMenuOne] = React.useState(false);
  const anchorRefOne = React.useRef(null);
  
  const handleToggleOne = () => {
    setOpenMenuOne((prevOpen) => !prevOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMenuOne);
  React.useEffect(() => {
    if (prevOpen?.current === true && openMenuOne === false) {
      anchorRefOne.current.focus();
    }

    prevOpen.current = openMenuOne;
  }, [openMenuOne]);

  return (
    <div className="topbar">
      <div className="topbarLeftCont">
        <Image src="/logo.png" width={60} height={38} alt="DevBpx logo" />
        <ExpandMoreIcon
          sx={{ color: "white", cursor: "pointer", width: "15px" }}

          ref={anchorRefOne}
          id="menu-one-button"
          aria-controls={openMenuOne ? "menu-one-list" : undefined}
          aria-expanded={openMenuOne ? "true" : undefined}
          aria-haspopup="true"
          onClick={() => handleToggleOne()}
        />
        <MenuPopperOne
          anchorRefOne={anchorRefOne}
          openMenuOne={openMenuOne}
          setOpenMenuOne={setOpenMenuOne}
          pos="topbar"
          menuSpecials={menuSpecials}
          ind={ind}
        />
      </div>
      <div className="topbarMidCont">
        <div className="languageBox">
          <p>DevBox / {languageSelect}</p>
        </div>
        <ExpandMoreIcon
          sx={{ color: "white", cursor: "pointer", width: "15px" }}
        />
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