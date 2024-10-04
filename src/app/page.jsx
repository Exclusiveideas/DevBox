"use client";

import styles from "./page.module.css";
import TopBar from "@/pageSections/topbar";
import OptionBar from "@/pageSections/optionsbar";
import StructureBar from "@/pageSections/structurebar";
import EditorBar from "@/pageSections/editorbar";
import PreviewTab from "@/pageSections/previewTab";
import { SplitView } from "@/components/splitView/splitView";
import { appStore } from "@/store/appStore";
import { useState } from "react";

export default function Home() {
  const { open: openPreviewTab } = appStore((state) => state.previewTab);

  return (
    <main className={styles.main}>
      <TopBar />
      <div className={styles.lowerSections}>
        <OptionBar className={styles.optionBar} />
        <StructureBar className={styles.structureBar} />
        <div className={styles.editPrevDiv}>
          <SplitView
            left={
              <div className={styles.editorBarWrapper}>
                <EditorBar />
              </div>
            }
            right={
              <>
                {openPreviewTab && (<div className={styles.previewTabWrapper}>
                  <PreviewTab />
                </div>
                )}
              </>
            }
          />
        </div>
      </div>
    </main>
  );
}