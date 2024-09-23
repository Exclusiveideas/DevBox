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
import { optionBarMenuOptOne, topBarMenuOptOne } from "@/utils/constants";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { appStore } from "@/store/appStore";

const MenuPopperOne = React.memo(({ anchorRefOne, menuSpecials, pos }) => {
  const menuPopperOpts = appStore((state) => state.menuPopperOpts); // global state
  const updateTopBarMenuOne = appStore((state) => state.updateTopBarMenuOne); // global state
  const updateTopBarMenuTwo = appStore((state) => state.updateTopBarMenuTwo); // global state
  const updateOptBarMenuOne = appStore((state) => state.updateOptBarMenuOne); // global state
  const updateOptBarMenuTwo = appStore((state) => state.updateOptBarMenuTwo); // global state

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
      updateOptBarMenuTwo({
        openOptBarMenuTwo: true,
      });
    } else {
      updateTopBarMenuTwo({
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
      updateOptBarMenuTwo({
        openOptBarMenuTwo: false,
      });
    } else {
      updateTopBarMenuTwo({
        openTopBarMenuTwo: false,
      });
    }
  };

  const handleMenuOneItemClick = (e) => {
    setClickedMenuOneItem(`${e?.target?.outerText}`);
    if (pos == "optionbar") handleOpenMenuTwo();
    else if (pos == "topbar" && e?.target?.outerText == "Editor")
      handleOpenMenuTwo();
    else if (pos == "topbar" && e?.target?.outerText != "Editor")
      closeMenuTwo();
    else return;
  };

  // Menu-Two fxxn end

  const handleClose = (event) => {
    if (anchorRefOne.current && anchorRefOne.current.contains(event.target)) {
      return;
    }

    if (pos == "optionbar") {
      updateOptBarMenuOne({
        openOptBarMenuOne: false,
      });
    } else {
      updateTopBarMenuOne({
        openTopBarMenuOne: false,
      });
    }
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab" || "Escape") {
      event.preventDefault();

      if (pos == "optionbar") {
        updateOptBarMenuOne({
          openOptBarMenuOne: false,
        });
      } else {
        updateTopBarMenuOne({
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
                    {popOpt}
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
