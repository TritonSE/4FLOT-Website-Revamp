// Admin Page Editor landing page
import styles from "./page.module.css";

import PageEditorCard from "@/components/PageEditorCard";

export default function PageEditorDashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.gridContainer}>
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/page-editor/home"
          title="Home"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/page-editor/about"
          title="About Us"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/page-editor/involved"
          title="Get Involved"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/page-editor/impact"
          title="Our Impact"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/page-editor/donate"
          title="Donate"
          last_updated="Month XX, XXXX, XX:XX"
        />
      </div>
    </main>
  );
}
