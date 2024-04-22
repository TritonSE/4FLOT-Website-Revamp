// Admin Page Editor landing page
import styles from "./page.module.css";

import Button from "@/components/Button";
import Collapsable from "@/components/Collapsable";
import CancelButton from "@/components/CancelButton"
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
          title="Section 1 - Upcoming Events"
          subsection={["Subtitle"]}
          textbox={[
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
        />
        <Collapsable
          title="Section 2 - Donate"
          subsection={["Subtitle"]}
          textbox={[
            "Your support and contributions will enable us to meet our goals and improve conditions. Your generous donation will fund our mission.",
          ]}
        />
        <div className={styles.buttonContainer}>
          <CancelButton text="Cancel"></CancelButton> 
          <Button text="Save"></Button> 
        </div>
      </div>
    </main>
  );
}
