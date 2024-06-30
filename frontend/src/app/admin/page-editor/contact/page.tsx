"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/contactPageDefault.json";

import ContactEditor from "./ContactEditor";
import styles from "./page.module.css";

export default function ContactEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["About Us", "Our Mission", "Our Team", "Contact Us"]}
        links={["./about", "./mission", "./team", "./contact"]}
        currPage={3}
        refreshPage={true}
      />

      <PageProvider initialPage={defaultPage}>
        <ContactEditor />
      </PageProvider>
    </main>
  );
}
