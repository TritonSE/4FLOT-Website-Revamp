"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import NewsletterArchive from "../../components/NewsletterArchive";
import NewsletterCard from "../../components/NewsletterCard";
import BackgroundHeader from "@/components/BackgroundHeader";
import NewsletterPopup from "../../components/NewsletterPopup";
import ButtonNewsletter from "../../components/ButtonNewsletter";



export default function newsletterDisplay() {

    const [popupOpen, setPopup] = useState(false);
    const handleSubscribeClick = () => {
      setPopup(true);
    };
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
        <div className={styles.subtitle}>Winter 2023: Title</div>
        {/* <div>Hello.</div> */}
        <div className={styles.containerCardsAndText}>
            <div className={styles.description}>December 19, 2023</div>
            <ButtonNewsletter text="Subscribe For Updates" onClick={handleSubscribeClick}></ButtonNewsletter>
            <NewsletterPopup open={popupOpen} setOpen={setPopup} />

    </div>
        <img
        src="/volunteerEvent.png"
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
          <img
            src="/ic_download.svg"
            alt="Download Icon"
            style={{ marginLeft: "10px", width: "27px", height: "27px" }}
          />
        </div>
        <p className={styles.description}>
          Good Day!
        </p>
        <p className={styles.description}>
          Once again, we are reaching out to our business and community leaders and asking that you be of assistance! Due to lower temperatures at night, our homeless and underprivileged community members need blankets, jackets, and socks. Within the last 2 weeks, we have given out over 100 blankets in Menifee, Murrieta Hemet, and Temecula, and the need is still great. If you have any old blankets, jackets, warm clothing, please reach out to us at ph: 909-757-1313. We are a mobile nonprofit organization, and we will make sure to pick up your tax-deductible donations and provide you with a receipt. Thanks to the generous donations from Riverside County's Third District, Supervisor Chuck Washington
        </p>

        <p className={styles.description}>
          We have Good News! 
        </p>

        <p className={styles.description}>
          Future Leaders of Tomorrow will be gearing up for our 2nd Annual Feed Our Community Holiday Meal and Toy Giveaway, which will be held in December 2023. We are asking local business and community leaders for your in-kind or cash donations. Last year the event was such a success! We were able to feed over 500 underprivileged families, and homeless community members, we saw so many smiles and togetherness that day! Last year, in December of 2022, we successfully hosted our first "Feed Our Community, Holiday Meal and Toy Giveaway". We had such a great time, the experience was awesome, 500 hot meals were passed out to attendees. Hot plates included chicken, coleslaw, biscuits, spaghetti, and pie for dessert. We had a snack table for the children with cookies, candy, chips, and juice. It was exciting to witness our community come together and have a great time. Music and games were played throughout the day. And toys and school supplies were given to children and teens.
        </p>

        <p className={styles.description}>
          We started Future Leaders of Tomorrow because we wanted to address the issue of poverty and lack of education affecting our community. There are so many underprivileged and unhoused individuals and families living on the streets of Riverside County who need warm meals, clothing, and school supplies. Most of our volunteers are young adults and teens, they are our Future Leaders of Tomorrow! (Everyone is welcome to volunteer! Everyone is young at heart!) We are a proud member of the Riverside Continuum of Care.
        </p>
        
        <div className={styles.subtitleSharePost} style={{ display: "flex", alignItems: "center" }}>
          Share This Post

          <img
            src="/facebook.svg"
            alt="facebook Icon"
            style={{ marginLeft: "20px", width: "30px", height: "30px", marginRight: "10px"}}
          />

            <img
            src="/twitter.svg"
            alt="twitter Icon"
            style={{ marginLeft: "10px", width: "40px", height: "40px" ,marginRight: "10px"}}
          />

        </div>
    </div>
    </main>
  );
}
