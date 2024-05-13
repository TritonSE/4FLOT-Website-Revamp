"use client";
import React, { useEffect, useState } from "react";

import { Newsletter, getNewsletter } from "../../../../api/newsletter";
import NewsletterPopup from "../../../../components/NewsletterPopup";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";
import Button from "@/components/Button";

type Props = {
  params: { newsletterID: string };
};

export default function NewsletterDisplay({ params }: Props) {
  const [popupOpen, setPopup] = useState(false);
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);

  const [images, setImages] = useState<BackgroundImage[]>([]);

  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.TEAM)
      .then((result) => {
        if (result.success) {
          setImages(result.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleSubscribeClick = () => {
    setPopup(true);
  };

  useEffect(() => {
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
        backgroundImageURIs={images.map((image) => image.imageURI)}
        header=""
        title="The 4FLOT Quarterly"
        description="4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. "
      />

      <div id="newsletter_page" className={styles.text}>
        <div className={styles.subtitle}>{newsletter?.title ?? "Loading..."}</div>
        <div className={styles.containerCardsAndText}>
          <div className={styles.description}>{newsletter?.date ?? "Loading..."}</div>
          <Button text="Subscribe For Updates" onClick={handleSubscribeClick} />
        </div>
        <div className={styles.popup}>
          <NewsletterPopup open={popupOpen} setOpen={setPopup} />
        </div>

        <img
          src={newsletter?.image ?? "image not found"}
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
        <div className={styles.subtitleSmaller} style={{ display: "flex", alignItems: "center" }}>
          Here’s Our Story
        </div>

        <pre className={styles.content}>{newsletter?.content}</pre>

        <div className={styles.subtitleSharePost} style={{ display: "flex", alignItems: "center" }}>
          Share This Post
          <a href="https://www.facebook.com/4FLOT.team/" target="_blank" rel="noopener noreferrer">
            <img
              src="/facebook.svg"
              alt="facebook Icon"
              style={{ marginLeft: "20px", width: "30px", height: "30px", marginRight: "10px" }}
            />
          </a>
          <a
            href="https://twitter.com/intent/post?url=https%3A%2F%2F4flot.com%2Fnewsletter%2Ff%2F4flot-quarterly-winter-addition&text=4FLOT%20Quarterly%20Winter%20Addition%20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/twitter.svg"
              alt="twitter Icon"
              style={{ marginLeft: "10px", width: "40px", height: "40px", marginRight: "10px" }}
            />
          </a>
        </div>
      </div>
    </main>
  );
}
