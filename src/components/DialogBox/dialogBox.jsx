import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { appStore } from "@/store/appStore";

const DIALOG_OPTIONS = [
  {
    title: "⚠️ You are closing the tour early ⚠️",
    contentText:
      " If this is your first time here, it is highly recommended you complete this tour.",
  },
  {
    title: "⚠️ Open a file",
    contentText: "To access the terminal, a file has to be open.",
  },
];

const DialogBox = () => {
  const { open: dialogOpen, initiator } = appStore((state) => state.dialogBox);
  const updateDialogBox = appStore((state) => state.updateDialogBox);

  const [dialogOpt, setDialogOpt] = useState(DIALOG_OPTIONS[0]);

  useEffect(() => {
    if (initiator == "tour") setDialogOpt(DIALOG_OPTIONS[0]);
    else if (initiator == "terminal") setDialogOpt(DIALOG_OPTIONS[1]);
  }, [initiator]);

  const handleDialogClose = (param) => {
    if (param) {
      updateDialogBox({
        open: false,
        param: param,
      });
    } else {
      updateDialogBox({
        open: false,
      });
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
        {dialogOpt?.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          style={{
            fontSize: "14px",
            color: "black",
            padding: "1rem 0.5rem",
          }}
        >
          {dialogOpt?.contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {initiator == "tour" && (
          <>
            <Button
              style={{ fontSize: "14px", color: "#ec407a" }}
              onClick={() => handleDialogClose("close")}
            >
              Close Tour
            </Button>
            <Button
              style={{ fontSize: "14px" }}
              onClick={() => handleDialogClose("continue")}
            >
              Continue Tour
            </Button>
          </>
        )}
        {initiator == "terminal" && (
          <Button
            style={{ fontSize: "14px" }}
            onClick={() => handleDialogClose()}
          >
            Okay
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
