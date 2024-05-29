"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/missionPageDefault.json";

import MissionEditor from "./MissionEditor";
import styles from "./page.module.css";

export default function MissionEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["About Us", "Our Mission", "Our Team", "Contact Us"]}
        links={["./about", "./mission", "./team", "./contact"]}
        currPage={1}
        refreshPage={true}
      />

      <PageProvider initialPage={defaultPage}>
        <MissionEditor />
      </PageProvider>
    </main>
  );
}
