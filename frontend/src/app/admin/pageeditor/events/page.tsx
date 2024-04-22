// Admin Page Editor landing page
import styles from "./page.module.css";

import Button from "@/components/Button";
import Collapsable from "@/components/Collapsable";

// import PageEditorCard from "@/components/PageEditorCard";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Header"
          subsection={["Subtitle", "Header Image Carousel"]}
          textbox={[
            "4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities.",
            "",
          ]}
        />
        <Collapsable
          title="Section 1"
          subsection={["Section Title", "Body Text"]}
          textbox={[
            "Get Involved at our Upcoming Events",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
        />
        <Collapsable
          title="Section 2"
          subsection={["Section Title", "Body Text", "Sponsor Image Gallery"]}
          textbox={[
            "Our Community Sponsors",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
        />
        <div className={styles.buttonContainer}>
          <Button text="Cancel" />
          <Button text="Save" />
        </div>
      </div>

      {/* <div className={styles.gridContainer}>
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
      </div> */}
    </main>
  );
}
