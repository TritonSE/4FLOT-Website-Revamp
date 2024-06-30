"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/eventsPageDefault.json";

import UpcomingEventsEditor from "./UpcomingEventsEditor";
import styles from "./page.module.css";

export default function UpcomingEventEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Get Involved", "Upcoming Events", "Past Events"]}
        links={["./involved", "./events", "./pastevents"]}
        currPage={1}
        refreshPage={true}
      />

      <PageProvider initialPage={defaultPage}>
        <UpcomingEventsEditor />
      </PageProvider>
    </main>
  );
}
