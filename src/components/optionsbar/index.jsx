"use client";

import React, { useEffect, useRef, useState } from "react";
import "./optionsbar.css";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { MenuPopperOptionsOne, MenuPopperOptionsTwo } from "@/utils/constants";



const OptionBar = () => {
  const [activeOpt, setactiveOpt] = useState(0);
  const [openMenuOne, setOpenMenuOne] = useState(false);
  const anchorRefOne = useRef(null);

  const handleToggleOne = () => {
    setOpenMenuOne((prevOpen) => !prevOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openMenuOne);
  useEffect(() => {
    if (prevOpen?.current === true && openMenuOne === false) {
      anchorRefOne.current.focus();
    }

    prevOpen.current = openMenuOne;
  }, [openMenuOne]);

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
                    aria-controls={openMenuOne ? "menu-one-list" : undefined}
                    aria-expanded={openMenuOne ? "true" : undefined}
                    aria-haspopup="true"
                    sx={{
                      color: `${
                        activeOpt == i ? "white" : "rgba(195, 195, 195, 0.934)"
                      }`,
                      cursor: "pointer",
                      width: "40px",
                    }}
                    onClick={() => {
                      handleToggleOne();
                      setactiveOpt(i);
                    }}
                  />

                  <MenuPopperOne
                    anchorRefOne={anchorRefOne}
                    openMenuOne={openMenuOne}
                    setOpenMenuOne={setOpenMenuOne}
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



const MenuPopperOne = ({ anchorRefOne, openMenuOne, setOpenMenuOne }) => {
  const [clickedMenuOneItem, setClickedMenuOneItem] = useState(null);

  // Menu-Two fxxn start
  const [openMenuTwo, setOpenMenuTwo] = useState(false);
  const anchorRefTwo = useRef(null);

  const handleOpenMenuTwo = () => {
    setOpenMenuTwo(true);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openMenuTwo);
  useEffect(() => {
    if (prevOpen?.current === true && openMenuTwo === false) {
      anchorRefTwo?.current.focus();
    }

    prevOpen.current = openMenuTwo;
  }, [openMenuTwo]);


  const handleMenuOneItemClick = (e) => {
    setClickedMenuOneItem(`${e?.target?.outerText}`);
    handleOpenMenuTwo();
  };

  // Menu-Two fxxn end


  const handleClose = (event) => {
    if (anchorRefOne.current && anchorRefOne.current.contains(event.target)) {
      return;
    }

    setOpenMenuOne(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenuOne(false);
    } else if (event.key === "Escape") {
      setOpenMenuOne(false);
    }
  }

  return (
    <Popper
      open={openMenuOne}
      anchorEl={anchorRefOne.current}
      role={undefined}
      placement="right-end"
      transition
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper sx={{ borderRadius: 10, backgroundColor: "rgb(51,51,51)" }}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={openMenuOne}
                id="menu-one-list"
                aria-labelledby="menu-one-button"
                onKeyDown={handleListKeyDown}
                className="popMenuList"
              >
                {MenuPopperOptionsOne?.map((popOpt, i) => (
                  <MenuItem
                    ref={anchorRefTwo}
                    id="menu-two-button"
                    aria-controls={openMenuTwo ? "menu-two-List" : undefined}
                    aria-expanded={openMenuTwo ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handleMenuOneItemClick(e)}
                    sx={{
                      fontSize: 13,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={i}
                  >
                    {popOpt}
                    <ChevronRightIcon
                      sx={{ color: "white", cursor: "pointer", width: "15px" }}
                    />
                    <MenuPopperTwo
                      anchorRefTwo={anchorRefTwo}
                      openMenuTwo={openMenuTwo}
                      setOpenMenuTwo={setOpenMenuTwo}
                      clickedMenuOneItem={clickedMenuOneItem}
                      openMenuOne={openMenuOne}
                    />
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};


const menuTwoWithExpand = ["Appearance", "Editor Layout"]

const menuTwoPreIcon = ['Auto Save', 'Confirm Before Close'] // work on this later

const menuTwoDisabled = ['Forward', 'Last Edit Location',]


const MenuPopperTwo = ({
  anchorRefTwo,
  openMenuTwo,
  setOpenMenuTwo,
  clickedMenuOneItem,
  openMenuOne,
}) => {



  const handleClose = (event) => {
    // Check if the click is inside the parent menu or the child menu
    if (
      anchorRefTwo?.current?.contains(event.target) ||
      event.target.closest(".menuTwoGroup") // Add this to check for clicks inside the child menu
    ) {
      return;
    }
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenuTwo(false);
    } else if (event.key === "Escape") {
      setOpenMenuTwo(false);
    }
  }

  const handleMenuTwoItemClick = (e) => {
    e.stopPropagation(); // Prevent event propagation
    e.preventDefault();

    return;
  };

  useEffect(() => {
    //when the first menu closes, close the second
    setOpenMenuTwo(false);
  }, [openMenuOne]);

  return (
    <Popper
      open={openMenuTwo}
      anchorEl={anchorRefTwo?.current}
      role={undefined}
      placement="right"
      transition
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper sx={{ borderRadius: 10, backgroundColor: "rgb(51,51,51)" }}>
            <ClickAwayListener onClickAway={handleClose}>
              <>
                {MenuPopperOptionsTwo[clickedMenuOneItem]?.map(
                  (menuTwoGroup, i) => (
                    <div className="menuTwoGroup" key={i}>
                      <p className="mTwoGroupItem">
                        <MenuList
                          autoFocusItem={openMenuTwo}
                          id="menu-two-list"
                          aria-labelledby="menu-two-button"
                          onKeyDown={handleListKeyDown}
                          className="popMenuList two"
                        >
                          {menuTwoGroup?.map((mTwoGroupItem, i) => (
                            <MenuItem
                              sx={{
                                fontSize: 12,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                padding: "0.2 .8rem",
                                gap: "4rem",
                                boxSizing: "border-box",
                              }}
                              onClick={(e) => handleMenuTwoItemClick(e)}
                              key={i}
                              className="menuTwoRowText"
                            >
                              {mTwoGroupItem?.map((rowText, i) => (
                                <>
                                  <p aria-disabled={menuTwoDisabled?.includes(mTwoGroupItem[0])? 'true': 'false'} key={i}>{rowText}</p>
                                  {menuTwoWithExpand?.includes(rowText) && (
                                    <ChevronRightIcon
                                      sx={{
                                        color: "white",
                                        cursor: "pointer",
                                        width: "13px",
                                      }}
                                    />
                                  )}
                                </>
                              ))}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </p>
                    </div>
                  )
                )}
              </>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
