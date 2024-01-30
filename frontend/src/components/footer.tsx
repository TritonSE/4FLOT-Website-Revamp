"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { createSubscriber } from "../api/subscriber";

import styles from "./Footer.module.css";

export function Footer() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null); // handleAPIError in /api/requests.ts will return a string

  // TODO: Add the correct links here.
  // Note: facebookLink and instagramLink are <a> tags, and the rest are Next <Link> tags
  const links = {
    facebookLink: "https://www.facebook.com/4FLOT.team/",
    instagramLink: "https://www.instagram.com/4_futureleadersoftomorrow/",
    aboutUs: "",
    getInvolved: "",
    ourImpact: "",
    ourMission: "",
    upcomingEvents: "",
    testimonials: "",
    contactUs: "",
    donate: "",
    newsletter: "",
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setErrors(null); // clear errors on new submission
    setLoading(true); // disable the submit button while loading
    event.preventDefault(); // We do not want the page to refresh
    createSubscriber({ email }).then(
      (result) => {
        if (result.success) {
          setSubmitted(true); // show the success message
          setEmail(""); // clear the email input
        } else {
          // This is certainly not the best solution to this issue, but it works okay for now.
          setEmail(""); // clear email input to show error message
          if (result.error === `400 Bad Request: {"error":"email must be a valid email address"}`) {
            setErrors("Invalid email address");
          } else if (result.error === `400 Bad Request: {"error":"email is already subscribed"}`) {
            setErrors("Already subscribed!");
          } else {
            setErrors(result.error); // show unfilterd error message
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
                type="email"
                id="email"
                name="email"
                placeholder={errors ?? "Enter your email address"}
                className={styles.inputBox}
                value={email}
                onChange={handleEmailChange}
                required
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
            <a className={`${styles.link} ${styles.boldLink}`} href={links.getInvolved}>
              Get Involved
            </a>
            <a className={`${styles.link} ${styles.boldLink}`} href={links.ourImpact}>
              Our Impact
            </a>
          </div>

          <div className={styles.linkRow}>
            <a className={`${styles.link} ${styles.normalLink}`} href={links.ourMission}>
              Our Mission
            </a>
            <a className={`${styles.link} ${styles.normalLink}`} href={links.upcomingEvents}>
              Upcoming Events
            </a>
            <a className={`${styles.link} ${styles.normalLink}`} href={links.testimonials}>
              Testimonials
            </a>
          </div>

          <div className={styles.linkRow}>
            <a className={`${styles.link} ${styles.normalLink}`} href={links.contactUs}>
              Contact Us
            </a>
            <a className={`${styles.link} ${styles.normalLink}`} href={links.donate}>
              Donate
            </a>
            <a className={`${styles.link} ${styles.normalLink}`} href={links.newsletter}>
              Newsletter
            </a>
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
              src="/facebookIcon.png"
              alt="Link to Facebook"
            />
          </a>
          <a href={links.instagramLink}>
            <Image
              width={42}
              height={42}
              className={styles.instagramLogo}
              src="/instagramIcon.png"
              alt="Link to Instagram"
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
}

export default Footer;
