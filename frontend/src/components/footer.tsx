"use client";

import Image from "next/image";
import React, { useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const facebookLink = "https://www.facebook.com/4FLOT.team/";
  const instagramLink = "https://www.instagram.com/4_futureleadersoftomorrow/";
  const copyrightMessage =
    "Copyright © 2022 4 future leaders of tomorrow -\nAll Rights Reserved.\n\n501c nonprofit tax-deductible ID 88-3463177";

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setSubmitted(false);
    console.log(email);
    console.log(submitted);
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // {TODO}
    // LATER: implement sending of nwesletter from backend

    event.preventDefault(); // Prevent form submission

    setSubmitted(true);
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* NEWSLETTER QUAD */}
        <div className="newsletterDiv">
          <p className="newsletter-text">Join our newsletter to stay updated!</p>

          <form onSubmit={handleNewsletterSubmit}>
            <div className="subscriptionDiv">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="input-box"
                value={email}
                onChange={handleEmailChange}
                required
              />

              {submitted ? (
                <button type="submit" id="subscribe-btn" className="input-button-submitted">
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
                <button type="submit" id="subscribe-btn" className="input-button">
                  Subscribe
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LINK QUAD */}
        <div className="linkDiv">
          <div className="linkRow">
            <a className="link boldLink" href="#1">
              About Us
            </a>
            <a className="link boldLink" href="#2">
              Get Involved
            </a>
            <a className="link boldLink" href="#3">
              Our Impact
            </a>
          </div>

          <div className="linkRow">
            <a className="link normalLink" href="#4">
              Our Mission
            </a>
            <a className="link normalLink" href="#5">
              Upcoming Events
            </a>
            <a className="link normalLink" href="#6">
              Testimonials
            </a>
          </div>

          <div className="linkRow">
            <a className="link normalLink" href="#7">
              Contact Us
            </a>
            <a className="link normalLink" href="#8">
              Donate
            </a>
            <a className="link normalLink" href="#9">
              Newsletter
            </a>
          </div>
        </div>

        {/* LOGO QUAD */}
        <div className="logoDiv">
          <Image
            width={262}
            height={92.95}
            className="logoImage"
            src="footerLogo.svg"
            alt="4 Future Leaders of Tomorrow Logo"
          />
          <a href={facebookLink}>
            <Image
              width={42}
              height={42}
              className="facebookLogo"
              src="/facebookIcon.png"
              alt="Link to Facebook"
            />
          </a>
          <a href={instagramLink}>
            <Image
              width={42}
              height={42}
              className="instagramLogo"
              src="/instagramIcon.png"
              alt="Link to Instagram"
            />
          </a>
        </div>

        {/* COPYRIGHT QUAD */}
        <div className="copyrightDiv">
          <p className="copyrightText">{copyrightMessage}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
