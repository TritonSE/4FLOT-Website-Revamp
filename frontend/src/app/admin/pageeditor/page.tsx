// Admin Page Editor landing page
// Admin Dashboard landing page
import DashboardCard from "@/components/DashboardCard";

import styles from "./page.module.css";

export default function Dashboard() {
    
    return (
      <main className={styles.page}>
          <div className={styles.cards}>
            <DashboardCard
              imageURI="/impact_bg.png"
              url="/admin/home"
              title="Home"
              last_updated="Month XX, XXXX, XX:XX"
            />
            <DashboardCard
              imageURI="/impact_bg.png"
              url="/admin/about"
              title="About Us"
              last_updated="Month XX, XXXX, XX:XX"
            />
            <DashboardCard
              imageURI="/impact_bg.png"
              url="/admin/involved"
              title="Get Involved"
              last_updated="Month XX, XXXX, XX:XX"
            />
            <DashboardCard
              imageURI="/impact_bg.png"
              url="/admin/impact"
              title="Our Impact"
              last_updated="Month XX, XXXX, XX:XX"
            />
            <DashboardCard
              imageURI="/impact_bg.png"
              url="/admin/donate"
              title="Donate"
              last_updated="Month XX, XXXX, XX:XX"
            />
            
          </div>
      </main>
    );
  }
  