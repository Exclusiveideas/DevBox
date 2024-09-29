"use client";

import styles from "./page.module.css";
import TopBar from "@/pageSections/topbar";
import OptionBar from "@/pageSections/optionsbar";
import StructureBar from "@/pageSections/structurebar";
import EditorBar from "@/pageSections/editorbar";
import PreviewTab from "@/pageSections/previewTab";
import { appStore } from "@/store/appStore";
import { SplitView } from "@/components/splitView/splitView";

export default function Home() {
  const previewTab = appStore((state) => state.previewTab);

  return (
    <main className={styles.main}>
      <TopBar />
      <div className={styles.lowerSections}>
        <OptionBar className={styles.optionBar} />
        <StructureBar className={styles.structureBar} />
        <div className={styles.editPrevDiv}>
          {previewTab.open ? (
            <SplitView left={<EditorBar />} right={<PreviewTab />} />
          ) : (
            <EditorBar />
          )}
        </div>
      </div>
    </main>
  );
}
