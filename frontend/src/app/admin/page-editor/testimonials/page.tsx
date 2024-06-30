"use client";

import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/testimonialsPageDefault.json";

import TestimonialsEditor from "./TestimonialsEditor";
import styles from "./page.module.css";

export default function TestimonialsEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Our Impact", "Testimonials", "Newsletter"]}
        links={["./impact", "./testimonials", "./newsletter"]}
        currPage={1}
        refreshPage={true}
      />
      <PageProvider initialPage={defaultPage}>
        <TestimonialsEditor />
      </PageProvider>
    </main>
  );
}
