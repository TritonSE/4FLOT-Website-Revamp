import Image from "next/image";
import React from "react";

import Button from "../../components/Button";

import styles from "./page.module.css";
import ContactInfoCard from "@/components/ContactInfoCard";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <main>
      <div className={styles.page}>
        {/*Reach Out To Us */}
        <div className={styles.text}>
          <div className={styles.title}>Reach Out To Us</div>
          <p className={styles.description}>
            There are many ways to join us and support our mission. Contact us to find out more
            about volunteering opportunities, fundraising, and more !
          </p>
        </div>
        <div className={styles.contactContainer}>
          <ContactInfoCard
            title="Phone Number"
            iconSrc="/phone.svg"
            description={["909-757-1313"]}
          ></ContactInfoCard>
          <ContactInfoCard
            title="Locations"
            iconSrc="/location.svg"
            description={["San Bernardino County", "Riverside County", "Los Angeles County"]}
          ></ContactInfoCard>
          <ContactInfoCard
            title="Email"
            iconSrc="/email.svg"
            description={["admin@4flot.com"]}
          ></ContactInfoCard>
        </div>

        {/* Stay Connected*/}
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <div className={styles.title}>Stay Connected</div>
            <Image src={"/stayConnected.svg"} alt="Stay Connected Image" width="456" height="467" />
          </div>
          <div className={styles.formContainer}>
            <ContactForm />
            <Button text="Contact Us" link=""></Button>
          </div>
        </div>
      </div>
    </main>
  );
}
