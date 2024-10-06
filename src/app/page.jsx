"use client";

import styles from "./page.module.css";
import TopBar from "@/pageSections/topbar";
import OptionBar from "@/pageSections/optionsbar";
import StructureBar from "@/pageSections/structurebar";
import EditorBar from "@/pageSections/editorbar";
import PreviewTab from "@/pageSections/previewTab";
import { SplitView } from "@/components/splitView/splitView";
import { appStore } from "@/store/appStore";
import React, { useState, useRef } from "react";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css"
import {
  getFileTree,
} from "@litecode-ide/virtual-file-system";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const INTIALTOURSTEP = 0;
const TOURSTEPS = [
  {
    element: ".vfs_tour",
    intro: "Here's lies your File Structure",
  },
  {
    element: ".languageBox",
    intro: "This shows the current file type you are editing",
  },
  {
    element: ".topbarLeftCont",
    intro: "This provides you with more app options like theme selection",
  },
  {
    element: ".optionBarMenu",
    intro: "This provides you with more editor options like creating terminal",
  },
  {
    element: ".optionbarSearchIcon",
    intro: "Click here to search for text(s) in files",
  },
  {
    element: ".githubIcon",
    intro: "Click here to create a git repository for your app  <span>[⚠️ Feature Not Available yet]</span>",
  },
  {
    element: ".topbarSignIn",
    intro: "Click here to create an account <span>[⚠️ Feature not available yet]</span> ",
  },
];

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default function Home() {
  const [stepsVisible, setStepsVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const pausedStep = useRef(INTIALTOURSTEP)
  const fileSystemEmpty = isEmpty(getFileTree())

  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (action) => {
    setDialogOpen(false);

    if (action === "close") {
      pausedStep.current = 0;
    } else {
      setStepsVisible(true);
    }
  };

  const onExit = () => {
    setStepsVisible(false)
  };

  const onBeforeExit = async (e) => {
    if (e < TOURSTEPS.length - 1) {
      pausedStep.current = e;
      handleDialogOpen();
      return true;
    }
    return true;
  };

  return (
    <>
      {fileSystemEmpty && (
        <>
          <Steps
            enabled={stepsVisible}
            steps={TOURSTEPS}
            initialStep={pausedStep.current}
            onExit={onExit}
            onBeforeExit={onBeforeExit}
          />
          <Dialog
            open={dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {}}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
              ⚠️ You are closing the tour early ⚠️
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
                If this is your first time here, it is highly recommended you
                complete this tour.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
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
            </DialogActions>
          </Dialog>
        </>
      )}
      <Page />
    </>
  );
}

const Page = () => {
  const { open: openPreviewTab } = appStore((state) => state.previewTab);

  return (
    <main className={styles.main}>
      <TopBar />
      <div className={styles.lowerSections}>
        <OptionBar />
        <StructureBar />
        <div className={styles.editPrevDiv}>
          <div className={styles.editorBarWrapper}>
            <EditorBar />
          </div>
          <div className={styles.splitWrapper}>
            <SplitView
            left={<></>}
            right={
              <>
                {openPreviewTab && (
                  <div className={styles.previewTabWrapper}>
                    <PreviewTab />
                  </div>
                )}
              </>
            }
          />
          </div>
          
          {/* {openPreviewTab && (
            <div className={styles.previewTabWrapper}>
              <PreviewTab />
            </div>
          )} */}
        </div>
      </div>
    </main>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
