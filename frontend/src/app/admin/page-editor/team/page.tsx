"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/teamPageDefault.json";

import TeamEditor from "./TeamEditor";
import styles from "./page.module.css";

export default function TeamEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["About Us", "Our Mission", "Our Team"]}
        links={["./about", "./mission", "./team", "./contact"]}
        currPage={2}
        refreshPage={true}
      />
      <PageProvider initialPage={defaultPage}>
        <TeamEditor />
      </PageProvider>
    </main>
  );
}
