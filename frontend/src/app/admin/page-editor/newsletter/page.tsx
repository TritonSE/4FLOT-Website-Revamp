"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/newsletterPageDefault.json";

import NewsletterEditor from "./NewsletterEditor";
import styles from "./page.module.css";

export default function NewsletterEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Our Impact", "Testimonials", "Newsletter"]}
        links={["./impact", "./testimonials", "./newsletter"]}
        currPage={2}
        refreshPage={true}
      />
      <PageProvider initialPage={defaultPage}>
        <NewsletterEditor />
      </PageProvider>
    </main>
  );
}
