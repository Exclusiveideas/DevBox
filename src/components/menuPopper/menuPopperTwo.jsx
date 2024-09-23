import React from "react";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { optionBarMenuOptTwo, topBarMenuOptTwo } from "@/utils/constants";
import { appStore } from "@/store/appStore";

const MenuPopperTwo = React.memo(
  ({ anchorRefTwo, clickedMenuOneItem, menuSpecials, pos }) => {

    const updateEditorBackdrop = appStore((state) => state.updateEditorBackdrop); // global state

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

    const menuListTwo =
      pos == "optionbar" ? optionBarMenuOptTwo : topBarMenuOptTwo;

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
      if (event.key === "Tab" || "Escape") {
        event.preventDefault();

        if (pos == "optionbar") {
          updateOptBarMenuTwo({
            openOptBarMenuTwo: false,
          });
        } else {
          updateTopBarMenuTwo({
            openTopBarMenuTwo: false,
          });
        }
      }
    }

    const handleMenuTwoItemClick = (e) => {
      e.stopPropagation(); // Prevent event propagation
      e.preventDefault();

      const { outerText } = e?.target;
      checkItemClick(outerText); // identifies which row was clicked

      return;
    };

    const checkItemClick = (outerText) => {
      switch (outerText) {
        case "Color Theme":
          selectTheme();
          break;
        default:
          return;
      }
    };

    const selectTheme = () => {
      // close menuPoppers
      if (pos == "optionbar") {
        updateOptBarMenuTwo({
          openOptBarMenuTwo: false,
        });
      } else {
        updateTopBarMenuTwo({
          openTopBarMenuTwo: false,
        });
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

      // opens backdrop
      updateEditorBackdrop({
        openBackdrop: true,
      });
    };

    React.useEffect(() => {
      //when the first menu closes, close the second

      if (pos == "optionbar") {
        updateOptBarMenuTwo({
          openOptBarMenuTwo: false,
        });
      } else {
        updateTopBarMenuTwo({
          openTopBarMenuTwo: false,
        });
      }
    }, [openMenuPopperOne, pos, updateOptBarMenuTwo, updateTopBarMenuTwo]);

    // ----------end-------

    return (
      <Popper
        open={openMenuPopperTwo}
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
                {pos == "optionbar" ? (
                  <>
                    {menuListTwo[clickedMenuOneItem]?.map((menuTwoGroup, i) => (
                      <div className="menuTwoGroup" key={i}>
                        <div className="mTwoGroupItem">
                          <MenuList
                            autoFocusItem={openMenuPopperTwo}
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
                                  <div
                                    className="rowTextSubDiv"
                                    style={{
                                      justifyContent:
                                        i == 1 ? "flex-end" : "space-between",
                                    }}
                                    key={i}
                                  >
                                    <p
                                      className={i == 1 ? "listText" : " "}
                                      aria-disabled={
                                        menuSpecials[
                                          "menuTwoDisabled"
                                        ]?.includes(mTwoGroupItem[0])
                                          ? "true"
                                          : "false"
                                      }
                                      key={i}
                                    >
                                      {rowText}
                                    </p>
                                    {menuSpecials[
                                      "menuTwoWithExpand"
                                    ]?.includes(rowText) && (
                                      <ChevronRightIcon
                                        sx={{
                                          color: "white",
                                          cursor: "pointer",
                                          width: "13px",
                                        }}
                                      />
                                    )}
                                  </div>
                                ))}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {menuListTwo?.map((menuTwoGroup, i) => (
                      <div className="menuTwoGroup" key={i}>
                        <div className="mTwoGroupItem">
                          <MenuList
                            autoFocusItem={openMenuPopperTwo}
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
                                  <div key={i}>
                                    <p
                                      className={i == 1 ? "listText" : " "}
                                      key={i}
                                    >
                                      {rowText}
                                    </p>
                                  </div>
                                ))}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  }
);

MenuPopperTwo.displayName = "MenuPopperTwo";


export default MenuPopperTwo;
