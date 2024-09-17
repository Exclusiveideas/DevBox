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



const MenuPopperOne = React.memo(({ anchorRefOne, openMenuOne, setOpenMenuOne, menuSpecials, pos}) => {
    const [clickedMenuOneItem, setClickedMenuOneItem] = React.useState('');
    const menuListOne = pos == 'optionbar' ? optionBarMenuOptOne : topBarMenuOptOne
  
    // Menu-Two fxxn start
    const [openMenuTwo, setOpenMenuTwo] = React.useState(false);
    const anchorRefTwo = React.useRef(null);
  
    const handleOpenMenuTwo = () => {
      setOpenMenuTwo(true);
    };
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(openMenuTwo);
    React.useEffect(() => {
      if (prevOpen?.current === true && openMenuTwo === false) {
        anchorRefTwo?.current.focus();
      }
  
      prevOpen.current = openMenuTwo;
    }, [openMenuTwo]);

    const closeMenuTwo = () => {
        setOpenMenuTwo(false)
      }
  
  
    const handleMenuOneItemClick = (e) => {
      setClickedMenuOneItem(`${e?.target?.outerText}`);
      if(pos == 'optionbar') handleOpenMenuTwo();
      else if(pos == 'topbar' && e?.target?.outerText == 'Editor') handleOpenMenuTwo();
      else if(pos == 'topbar' && e?.target?.outerText != 'Editor') closeMenuTwo();
      else return;
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
                  {menuListOne?.map((popOpt, i) => (
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
                      {pos == 'optionbar' && (<ChevronRightIcon
                        sx={{ color: "white", cursor: "pointer", width: "15px" }}
                      />)}
                      {pos == 'topbar' && popOpt == "Editor" && (<ChevronRightIcon
                        sx={{ color: "white", cursor: "pointer", width: "15px" }}
                      />)}
                      <MenuPopperTwo
                        anchorRefTwo={anchorRefTwo}
                        openMenuTwo={openMenuTwo}
                        setOpenMenuTwo={setOpenMenuTwo}
                        clickedMenuOneItem={clickedMenuOneItem}
                        openMenuOne={openMenuOne}
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
  })

  
export default MenuPopperOne