import Image from "next/image";
import styles from "./page.module.css";
import TopBar from "@/pageSections/topbar";
import OptionBar from "@/pageSections/optionsbar";
import StructureBar from "@/pageSections/structurebar";
import EditorBar from "@/pageSections/editorbar";

export default function Home() {

  return (
    <main className={styles.main}>
      <TopBar />
      <div className={styles.lowerSections}>
        <OptionBar />
        <StructureBar />
        <EditorBar />
      </div>
    </main>
  );
}
