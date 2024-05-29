"use client";

import { Page } from "../../../../api/pageeditor";
import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/aboutPageDefault.json";

import AboutEditor from "./AboutEditor";
import styles from "./page.module.css";

export default function AboutEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["About Us", "Our Mission", "Our Team", "Contact Us"]}
        links={["./about", "./mission", "./team", "./contact"]}
        currPage={0}
        refreshPage={true}
      />
      <PageProvider initialPage={defaultPage as Page}>
        <AboutEditor />
      </PageProvider>
    </main>
  );
}
