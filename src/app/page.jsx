"use client";

import styles from "./page.module.css";
import TopBar from "@/pageSections/topbar";
import OptionBar from "@/pageSections/optionsbar";
import StructureBar from "@/pageSections/structurebar";
import EditorBar from "@/pageSections/editorbar";
import PreviewTab from "@/pageSections/previewTab";
import { appStore } from "@/store/appStore";
import { useResizable } from "react-resizable-layout";
import { cn } from "@/utils/functions";
import SampleSplitter from "@/components/sampleSplitter/sampleSpliter";

export default function Home() {
  const previewTab = appStore((state) => state.previewTab);

  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true,
  });

  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 50,
  });

  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true,
  });

  return (
    <main className={styles.main}>
      <TopBar />
      <div className={styles.lowerSections}>
        <OptionBar className={styles.optionBar} />
        <StructureBar className={styles.structureBar} />
        <div className={styles.editPrevDiv}>
          <div
            style={{ flexGrow: 1, backgroundColor: 'red' }}
            className={styles.editor}
          >
            <EditorBar />
          </div>
          <SampleSplitter
            isDragging={isPluginDragging}
            {...pluginDragBarProps}
          />
          <div
            className={cn(
              styles.plugin,
              isPluginDragging && styles.dragging
            )}
            style={{ width: pluginW, backgroundColor: 'blue' }}
          >
            {previewTab.open && <PreviewTab />}
          </div>
        </div>
      </div>
    </main>
  );
}
