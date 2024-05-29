"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getPageData } from "../../../api/pageeditor";
import ContactForm from "../../../components/ContactForm";
import ContactInfoCard from "../../../components/ContactInfoCard";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";
import { generatePageMap } from "../../admin/util/pageeditUtil";

import styles from "./page.module.css";

export default function Contact() {
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPageData("contact")
      .then((response) => {
        if (response.success) setPageMap(generatePageMap(response.data));
        else throw new Error(response.error);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  }, []);

  if (loading || !pageMap) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <div className={styles.page}>
        {/*Reach Out To Us */}
        <div className={styles.text}>
          <div className={styles.title}>Reach Out To Us</div>
          <p className={styles.description}>{pageMap.get("Subtitle") as string}</p>
        </div>
        <div className={styles.contactContainer}>
          <ContactInfoCard
            title="Phone Number"
            iconSrc="/phone.svg"
            description={(pageMap.get("Phone Number") as string).split("\n")}
          ></ContactInfoCard>
          <ContactInfoCard
            title="Locations"
            iconSrc="/location.svg"
            description={(pageMap.get("Locations") as string).split("\n")}
          ></ContactInfoCard>
          <ContactInfoCard
            title="Email"
            iconSrc="/email.svg"
            description={(pageMap.get("Email") as string).split("\n")}
          ></ContactInfoCard>
        </div>

        {/* Stay Connected*/}
        <div className={styles.container}>
          <div>
            <div className={styles.title}>Stay Connected</div>
            <div className={styles.imageContainer}>
              <Image
                src={"/stayConnected.svg"}
                alt="Stay Connected Image"
                width="497"
                height="455"
              />
            </div>
          </div>
          <div className={styles.formContainer}>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
