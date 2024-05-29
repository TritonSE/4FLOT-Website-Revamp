"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/homePageDefault.json";

import HomeEditor from "./HomeEditor";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <PageToggle pages={["Home"]} links={["./home"]} currPage={0} />
      <PageProvider initialPage={defaultPage}>
        <HomeEditor />
      </PageProvider>
    </main>
  );
}
