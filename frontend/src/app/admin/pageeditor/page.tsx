// Admin Page Editor landing page
// Admin Dashboard landing page
import PageEditorCard from "@/components/PageEditorCard";

import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.gridContainer}>
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/dashboard"
          title="Home"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/dashboard"
          title="About Us"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/dashboard"
          title="Get Involved"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/dashboard"
          title="Our Impact"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/dashboard"
          title="Donate"
          last_updated="Month XX, XXXX, XX:XX"
        />
      </div>
    </main>
  );
}
