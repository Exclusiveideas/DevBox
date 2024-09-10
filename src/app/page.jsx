import Image from "next/image";
import styles from "./page.module.css";
import TopBar from "@/components/topbar";
import OptionBar from "@/components/optionsbar";
import StructureBar from "@/components/structurebar";
import EditorBar from "@/components/editorbar";

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
