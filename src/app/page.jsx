"use client";

import styles from "./page.module.css";
import TopBar from "@/pageSections/topbar";
import OptionBar from "@/pageSections/optionsbar";
import StructureBar from "@/pageSections/structurebar";
import EditorBar from "@/pageSections/editorbar";
import PreviewTab from "@/pageSections/previewTab";
import { SplitView } from "@/components/splitView/splitView";
import { appStore } from "@/store/appStore";
import React, { useState, useRef, useEffect } from "react";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import { getFileTree } from "@litecode-ide/virtual-file-system";

import { INTIALTOURSTEP, TOURSTEPS } from "@/utils/constants";
import DialogBox from "@/components/DialogBox/dialogBox";



const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default function Home() {
  const [stepsVisible, setStepsVisible] = useState(true);
  const pausedStep = useRef(INTIALTOURSTEP);
  const fileSystemEmpty = isEmpty(getFileTree());
  const dialogBox = appStore((state) => state.dialogBox);
  const updateDialogBox= appStore((state) => state.updateDialogBox);
  
  const updateEditorOpts = appStore((state) => state.updateEditorOpts);
  const updateTerminal = appStore((state) => state.updateTerminal);

  const stepsRef = useRef()


  useEffect(() => {
    if (dialogBox.open) return;

    if (dialogBox.param == "continue") {
      updateStepsPos();
      setStepsVisible(true);
    } else if (dialogBox.param == "close") {
    }

  }, [dialogBox]);


  const updateStepsPos = () => {
      if (pausedStep.current >= 5 && pausedStep.current <= 9) {
        pausedStep.current = 5;
        updateEditorOpts({
          tourDemo: true,
        });
      } else if (pausedStep.current >= 5) {
        updateEditorOpts({
          tourDemo: true,
        });
      }
      stepsRef.current.updateStepElement(6);
      stepsRef.current.updateStepElement(7);
      stepsRef.current.updateStepElement(8);
  }
  
  

  const onExit = () => {
    setStepsVisible(false);
    updateEditorOpts({
      tourDemo: false,
    });
  };

  const onBeforeExit = async (e) => {
    if (e < TOURSTEPS.length - 1) {
      pausedStep.current = e;
      updateDialogBox({
        open: true,
        initiator: 'tour'
      });
    }

    return true;
  };


  const onBeforeChange = (e) => {

    if (e == 5) {
      updateEditorOpts({
        tourDemo: true,
      });
    } else if (e == 6 && stepsRef.current) {
      stepsRef.current.updateStepElement(6);
      stepsRef.current.updateStepElement(7);
      stepsRef.current.updateStepElement(8);
    } 
  }
  
  const onAfterChange = (e) => {
    
  }


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
            onBeforeChange={onBeforeChange}
            onAfterChange={onAfterChange}
            ref={steps => (stepsRef.current = steps)}
          />
          <DialogBox initiator="tour" />
        </>
      )}
      <Page />
    </>
  );
}

const Page = () => {
  const { open: openPreviewTab } = appStore((state) => state.previewTab);
  const { tourDemo } = appStore((state) => state.editorOpts);

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
          {openPreviewTab && (
            <div className={styles.splitWrapper}>
              <SplitView
                right={
                  <>
                    <div className={styles.previewTabWrapper}>
                      <PreviewTab />
                    </div>
                  </>
                }
              />
            </div>
          )}
          {!openPreviewTab && tourDemo && (<PreviewTab />)}
        </div>
      </div>
    </main>
  );
};
