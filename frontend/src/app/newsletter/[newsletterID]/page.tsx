"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import NewsletterArchive from "../../../components/NewsletterArchive";
import NewsletterCard from "../../../components/NewsletterCard";
import BackgroundHeader from "@/components/BackgroundHeader";
import NewsletterPopup from "../../../components/NewsletterPopup";
import ButtonNewsletter from "../../../components/ButtonNewsletter";
import { Newsletter, getNewsletter } from "../../../api/newsletter";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type Props = {
  params: { newsletterID: String };
};




export default function newsletterDisplay({ params }: Props) {

    const [popupOpen, setPopup] = useState(false);
    const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
    const handleSubscribeClick = () => {
      setPopup(true);
    };

    const printDocument = () => {
      window.scrollTo(0, 0);
      html2canvas(document.body, { scale: 0.32 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf");
      });
    }


    useEffect(() => {
      // Fetch event details
      console.log(params.newsletterID)
      getNewsletter(params.newsletterID)
        .then((response) => {
          if (response.success) {
            setNewsletter(response.data);
          } else {
            alert(response.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }, []);


    return (
    <main>
    <BackgroundHeader
      backgroundImage="/PeopleHugging.png"
      header=""
      title="The 4FLOT Quaterly"
      description="4FLOT is committed in preventing and ending homelessness, hunger and 
      disparity in underprivileged communities."
    />
    <div className={styles.text}>
        <div className={styles.subtitle}>{newsletter?.title ?? "Loading..."}</div>
        {/* <div>Hello.</div> */}
        <div className={styles.containerCardsAndText}>
            <div className={styles.description}>{newsletter?.date ?? "Loading..."}</div>
            <ButtonNewsletter text="Subscribe For Updates" onClick={handleSubscribeClick}></ButtonNewsletter>
            <NewsletterPopup open={popupOpen} setOpen={setPopup} />

    </div>
        <img
        src= {newsletter?.image ?? "image not found"}
        alt="Description of the image"
        style={{
        border: "1px solid #000",
        background: "url(/your-image-path.jpg), lightgray 50% / cover no-repeat",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        width: "1550px",
        height: "775px",
        flexShrink: 0,
        }}
        />
        <div className={styles.subtitleSmaller} style={{ display: "flex", alignItems: "center" }} onClick={printDocument}>
          Here’s Our Story
          <img
            src="/ic_download.svg"
            alt="Download Icon"
            style={{ marginLeft: "10px", width: "27px", height: "27px" }}
          />
        </div>

          {newsletter?.content.map((paragraph, index) => (
          <p key={index} className={styles.description}>
            {paragraph}
          </p>
        ))}
        
        <div className={styles.subtitleSharePost} style={{ display: "flex", alignItems: "center" }}>
          Share This Post

          <a href="https://www.facebook.com/4FLOT.team/" target="_blank" rel="noopener noreferrer">
            <img
              src="/facebook.svg"
              alt="facebook Icon"
              style={{ marginLeft: "20px", width: "30px", height: "30px", marginRight: "10px"}}
            />
          </a>

          <a href="https://twitter.com/intent/post?url=https%3A%2F%2F4flot.com%2Fnewsletter%2Ff%2F4flot-quarterly-winter-addition&text=4FLOT%20Quarterly%20Winter%20Addition%20" target="_blank" rel="noopener noreferrer">
            <img
              src="/twitter.svg"
              alt="twitter Icon"
              style={{ marginLeft: "10px", width: "40px", height: "40px", marginRight: "10px"}}
            />
          </a>

        </div>
    </div>
    </main>
  );
}
