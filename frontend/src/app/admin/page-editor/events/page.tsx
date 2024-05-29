"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/eventsPageDefault.json";

import styles from "./page.module.css";

export default function UpcomingEventEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Get Involved", "Upcoming Events"]}
        links={["./involved", "./events"]}
        currPage={1}
        refreshPage={true}
      />

      <PageProvider initialPage={defaultPage}>
        <UpcomingEventEditorPage />
      </PageProvider>
    </main>
  );
}
