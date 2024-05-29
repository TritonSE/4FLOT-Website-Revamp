"use client";

import { Page } from "../../../../api/pageeditor";
import PageToggle from "../../../../components/PageToggle";
import { PageProvider } from "../../../../components/admin/pageeditor/PageProvider";
import defaultPage from "../../../../components/admin/pageeditor/defaultPages/impactPageDefault.json";

import ImpactEditor from "./ImpactEditor";
import styles from "./page.module.css";

export default function ImpactEditorPage() {
  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Our Impact", "Testimonials", "Newsletter"]}
        links={["./impact", "./testimonials", "./newsletter"]}
        currPage={0}
        refreshPage={true}
      />
      <PageProvider initialPage={defaultPage as Page}>
        <ImpactEditor />
      </PageProvider>
    </main>
  );
}
