import React from "react";
import "./topbar.css";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TopBar = () => {
  const languageSelect = "JavaScript";

  return (
    <div className="topbar">
      <div className="topbarLeftCont">
        <Image src="/logo.png" width={60} height={38} alt="DevBpx logo" />
        <ExpandMoreIcon sx={{ color: "white", cursor: "pointer", width: '15px' }} />
      </div>
      <div className="topbarMidCont">
        <div className="languageBox">
          <p>DevBox / {languageSelect}</p>
        </div>
        <ExpandMoreIcon sx={{ color: "white", cursor: "pointer", width: '15px' }} />
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
