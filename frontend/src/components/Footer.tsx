"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { createSubscriber } from "../api/subscriber";

import styles from "./Footer.module.css";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null); // handleAPIError in /api/requests.ts will return a string
  const [placeholder, setPlaceholder] = useState<string>("Enter your email address");

  // TODO: Add the correct links here.
  // Note: facebookLink and instagramLink are <a> tags, and the rest are Next <Link> tags
  const links = {
    facebookLink: "https://www.facebook.com/4FLOT.team/",
    instagramLink: "https://www.instagram.com/4_futureleadersoftomorrow/",
    youtubeLink: "https://youtube.com/@4flot?si=pPYwcHA8qQjheU_a",
    twitterLink: "https://x.com/4flot?s=11&t=dZuyjiYpwbB9rVwU4VTibw",
    tiktokLink: "/",
    aboutUs: "/about",
    getInvolved: "/involved",
    ourImpact: "/impact",
    ourMission: "/mission",
    upcomingEvents: "/upcoming-events",
    pastEvents: "/past-events",
    testimonials: "/testimonials",
    ourTeam: "/team",
    contactUs: "/contact",
    donate: "/donations",
    newsletter: "/newsletter",
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setSubmitted(false);
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setErrors(null); // clear errors on new submission
    setLoading(true); // disable the submit button while loading
    event.preventDefault(); // We do not want the page to refresh
    createSubscriber({ email }).then(
      (result) => {
        if (result.success) {
          setSubmitted(true); // show the success message
          setPlaceholder("Thanks for subscribing!");
          setEmail(""); // clear the email input
        } else {
          // This is certainly not the best solution to this issue, but it works okay for now.
          setEmail(""); // clear email input to show error message
          if (result.error === `400 Bad Request: {"error":"email must be a valid email address"}`) {
            setErrors(result.error);
            setPlaceholder("Please enter a valid email address (xxx@domain.com)");
          } else if (result.error === `400 Bad Request: {"error":"email is already subscribed"}`) {
            setErrors("Already subscribed!");
            setPlaceholder("This email is already subscribed!");
          } else {
            setErrors(result.error); // show unfilterd error message
            setPlaceholder("Error with your request, please try again later");
          }
        }
      },
      (error) => {
        // If the .then() request fails, show the error message
        alert(error);
      },
    );
    setLoading(false); // re-enable the submit button
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* NEWSLETTER QUAD */}
        <div className={styles.newsletterDiv}>
          <p className={styles.newsletterText}>Join our newsletter to stay updated!</p>

          <form onSubmit={handleNewsletterSubmit}>
            <div className={styles.subscriptionDiv}>
              <input
                type="text"
                id="email"
                name="email"
                placeholder={placeholder}
                className={errors ? styles.inputBoxError : styles.inputBox}
                value={email}
                onChange={handleEmailChange}
              />

              {submitted ? (
                <button
                  type="submit"
                  id="subscribe-btn"
                  className={styles.inputButtonSubmitted}
                  disabled={isLoading}
                >
                  Subscribed!
                  <Image
                    width={24}
                    height={24}
                    className="checkMark"
                    src="ic_simplesuccess.svg"
                    alt=""
                  />
                </button>
              ) : (
                <button
                  type="submit"
                  id="subscribe-btn"
                  className={styles.inputButton}
                  disabled={isLoading}
                >
                  Subscribe
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LINK QUAD */}
        <div className={styles.linkDiv}>
          <div className={styles.linkRow}>
            <Link className={`${styles.link} ${styles.boldLink}`} href={links.aboutUs}>
              About Us
            </Link>
            <Link className={`${styles.link} ${styles.boldLink}`} href={links.getInvolved}>
              Get Involved
            </Link>
            <Link className={`${styles.link} ${styles.boldLink}`} href={links.ourImpact}>
              Our Impact
            </Link>
          </div>

          <div className={styles.linkRow}>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.ourMission}>
              Our Mission
            </Link>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.upcomingEvents}>
              Upcoming Events
            </Link>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.testimonials}>
              Testimonials
            </Link>
          </div>

          <div className={styles.linkRow}>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.ourTeam}>
              Our Team
            </Link>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.pastEvents}>
              Past Events
            </Link>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.newsletter}>
              Newsletter
            </Link>
          </div>

          <div className={styles.linkRow}>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.contactUs}>
              Contact Us
            </Link>
            <Link className={`${styles.link} ${styles.normalLink}`} href={links.donate}>
              Donate
            </Link>
          </div>
        </div>

        {/* LOGO QUAD */}
        <div className={styles.logoDiv}>
          <Image
            width={262}
            height={92.95}
            className={styles.logoImage}
            src="footerLogo.svg"
            alt="4 Future Leaders of Tomorrow Logo"
          />
          <a href={links.facebookLink}>
            <Image
              width={42}
              height={42}
              className={styles.facebookLogo}
              src="/facebookIcon.svg"
              alt="Link to Facebook"
            />
          </a>
          <a href={links.instagramLink}>
            <Image
              width={42}
              height={42}
              className={styles.instagramLogo}
              src="/instagramIcon.svg"
              alt="Link to Instagram"
            />
          </a>
          <a href={links.youtubeLink}>
            <Image
              width={54}
              height={54}
              className={styles.youtubeLogo}
              src="/youtubeIcon.svg"
              alt="Link to Youtube"
            />
          </a>
          <a href={links.twitterLink}>
            <Image
              width={36}
              height={36}
              className={styles.twitterLogo}
              src="/twitterIcon.svg"
              alt="Link to Twitter"
            />
          </a>
          <a href={links.tiktokLink}>
            <Image
              width={48}
              height={48}
              className={styles.tiktokLogo}
              src="/tiktokIcon.svg"
              alt="Link to Tiktok"
            />
          </a>
        </div>

        {/* COPYRIGHT QUAD */}
        <div className={styles.copyrightDiv}>
          <p className={styles.copyrightText}>
            {
              "Copyright © 2022 4 future leaders of tomorrow -\nAll Rights Reserved.\n\n501c nonprofit tax-deductible ID 88-3463177"
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
