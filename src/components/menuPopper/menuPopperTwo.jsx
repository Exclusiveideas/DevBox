import React from "react";
import {
  Backdrop,
  CircularProgress,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { optionBarMenuOptTwo, topBarMenuOptTwo } from "@/utils/constants";

const MenuPopperTwo = React.memo(
  ({
    anchorRefTwo,
    openMenuTwo,
    setOpenMenuTwo,
    clickedMenuOneItem,
    openMenuOne,
    menuSpecials,
    pos,
  }) => {
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

      const { outerText } = e?.target;
      checkItemClick(outerText);

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
      handleOpenBackdrop();
    };

    React.useEffect(() => {
      //when the first menu closes, close the second
      setOpenMenuTwo(false);
    }, [openMenuOne]);

    // for backdrop component
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const handleCloseBackdrop = () => {
      setOpenBackdrop(false);
    };

    const handleOpenBackdrop = () => {
      setOpenBackdrop(true);
    };

    // ----------end-------

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
                {pos == "optionbar" ? (
                  <>
                    {menuListTwo[clickedMenuOneItem]?.map((menuTwoGroup, i) => (
                      <div className="menuTwoGroup" key={i}>
                        <div className="mTwoGroupItem">
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
        <BackdropComp
          openBackdrop={openBackdrop}
          handleCloseBackdrop={handleCloseBackdrop}
        />
            </Paper>
          </Grow>
        )}


      </Popper>
    );
  }
);

export default MenuPopperTwo;



const BackdropComp = ({
  openBackdrop,
  handleCloseBackdrop,
}) => (
    <Backdrop
      sx={(theme) => ({ color: "#000", zIndex: theme.zIndex.drawer + 1 })}
      open={openBackdrop}
      onClick={handleCloseBackdrop}
    >
    </Backdrop>
  );
