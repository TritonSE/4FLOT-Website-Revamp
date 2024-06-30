"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/pastEventsPageDefault.json";
import styles from "../about/page.module.css";

import PastEventsEditor from "./PastEventsEditor";

export default function UpcomingEventEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Get Involved", "Upcoming Events", "Past Events"]}
        links={["./involved", "./events", "./pastevents"]}
        currPage={2}
        refreshPage={true}
      />

      <PageProvider initialPage={defaultPage}>
        <PastEventsEditor />
      </PageProvider>
    </main>
  );
}
