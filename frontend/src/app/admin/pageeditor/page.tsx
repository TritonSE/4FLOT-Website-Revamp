// Admin Page Editor landing page
import styles from "./page.module.css";

import PageEditorCard from "@/components/PageEditorCard";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.gridContainer}>
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/pageeditor/home"
          title="Home"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/pageeditor/aboutus"
          title="About Us"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/pageeditor/involved"
          title="Get Involved"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/pageeditor/impact"
          title="Our Impact"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <PageEditorCard
          imageURI="/impact_bg.png"
          url="/pageeditor/donate"
          title="Donate"
          last_updated="Month XX, XXXX, XX:XX"
        />
      </div>
    </main>
  );
}
