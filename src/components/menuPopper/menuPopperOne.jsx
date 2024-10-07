"use client"

import React from "react";
import MenuPopperTwo from "./menuPopperTwo";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper, 
} from "@mui/material";
import { menuSpecials, optionBarMenuOptOne, topBarMenuOptOne } from "@/utils/constants";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { appStore } from "@/store/appStore";

const MenuPopperOne = React.memo(({ anchorRefOne, pos }) => {
  const menuPopperOpts = appStore((state) => state.menuPopperOpts); // global state
  const updateMenuPopperOpts = appStore((state) => state.updateMenuPopperOpts); // global state

  const openMenuPopperOne = //selects either to open the topbarMenu or optionsbarMenu
    pos == "optionbar"
      ? menuPopperOpts?.openOptBarMenuOne
      : menuPopperOpts?.openTopBarMenuOne;
  const openMenuPopperTwo =
    pos == "optionbar"
      ? menuPopperOpts?.openOptBarMenuTwo
      : menuPopperOpts?.openTopBarMenuTwo;

  const [clickedMenuOneItem, setClickedMenuOneItem] = React.useState("");
  const menuListOne =
    pos == "optionbar" ? optionBarMenuOptOne : topBarMenuOptOne;

  // Menu-Two fxxn start
  const anchorRefTwo = React.useRef(null);

  const handleOpenMenuTwo = () => {
    if (pos == "optionbar") {
      updateMenuPopperOpts({
        openOptBarMenuTwo: true,
      });
    } else {
      updateMenuPopperOpts({
        openTopBarMenuTwo: true,
      });
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMenuPopperTwo);
  React.useEffect(() => {
    if (prevOpen?.current === true && openMenuPopperTwo === false) {
      anchorRefTwo?.current.focus();
    }

    prevOpen.current = openMenuPopperTwo;
  }, [openMenuPopperTwo]);

  const closeMenuTwo = () => {
    if (pos == "optionbar") {
      updateMenuPopperOpts({
        openOptBarMenuTwo: false,
      });
    } else {
      updateMenuPopperOpts({
        openTopBarMenuTwo: false,
      });
    }
  };

  const handleMenuOneItemClick = (e) => {
    setClickedMenuOneItem(`${e?.target?.outerText}`);
    if (pos == "optionbar") handleOpenMenuTwo();
    else if (pos == "topbar") handleTopBarMenuOneClick(e?.target?.outerText);
    
  };

  const handleTopBarMenuOneClick = (outerText) => {
    switch (outerText) {
      case "Editor":
        handleOpenMenuTwo();
        break;
      case "Documentation":
        closeMenuTwo();
        const newWindow = window.open('https://github.com/Exclusiveideas/DevBox', '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null
        break;
      default:
        return;
    }
  }

  // Menu-Two fxxn end

  const handleClose = (event) => {
    if (anchorRefOne.current && anchorRefOne.current.contains(event.target)) {
      return;
    }

    if (pos == "optionbar") {
      updateMenuPopperOpts({
        openOptBarMenuOne: false,
      });
    } else {
      updateMenuPopperOpts({
        openTopBarMenuOne: false,
      });
    }
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab" || "Escape") {
      event.preventDefault();

      if (pos == "optionbar") {
        updateMenuPopperOpts({
          openOptBarMenuOne: false,
        });
      } else {
        updateMenuPopperOpts({
          openTopBarMenuOne: false,
        });
      }
    }
  }

  return (
    <Popper
      open={openMenuPopperOne}
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
                autoFocusItem={openMenuPopperOne}
                id="menu-one-list"
                aria-labelledby="menu-one-button"
                onKeyDown={handleListKeyDown}
                className="popMenuList"
              >
                {menuListOne?.map((popOpt, i) => (
                  <MenuItem
                    ref={anchorRefTwo}
                    id="menu-two-button"
                    aria-controls={
                      openMenuPopperTwo ? "menu-two-List" : undefined
                    }
                    aria-expanded={openMenuPopperTwo ? "true" : undefined}
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
                    <p
                      aria-disabled={
                        menuSpecials["menuOneDisabled"]?.includes(popOpt)
                          ? "true"
                          : "false"
                      }
                    >
                      {popOpt}
                    </p>
                    {pos == "optionbar" && (
                      <ChevronRightIcon
                        sx={{
                          color: "white",
                          cursor: "pointer",
                          width: "15px",
                        }}
                      />
                    )}
                    {pos == "topbar" && popOpt == "Editor" && (
                      <ChevronRightIcon
                        sx={{
                          color: "white",
                          cursor: "pointer",
                          width: "15px",
                        }}
                      />
                    )}
                    <MenuPopperTwo
                      anchorRefTwo={anchorRefTwo}
                      clickedMenuOneItem={clickedMenuOneItem}
                      menuSpecials={menuSpecials}
                      pos={pos}
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
});

MenuPopperOne.displayName = "MenuPopperOne";

export default MenuPopperOne;
