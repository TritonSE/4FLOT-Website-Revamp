"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/involvedPageDefault.json";

import InvolvedEditor from "./InvolvedEditor";
import styles from "./page.module.css";

export default function InvolvedEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Get Involved", "Upcoming Events"]}
        links={["./involved", "./events"]}
        currPage={0}
        refreshPage={true}
      />

      <PageProvider initialPage={defaultPage}>
        <InvolvedEditor />
      </PageProvider>
    </main>
  );
}
