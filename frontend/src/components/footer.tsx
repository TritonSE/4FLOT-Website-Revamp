import Image from "next/image";
import React from "react";
import "../styles/footer.css";

const Footer = () => {
  const facebookLink = "https://www.facebook.com/4FLOT.team/";
  const instagramLink = "https://www.instagram.com/4_futureleadersoftomorrow/";
  const copyrightMessage =
    "Copyright © 2022 4 future leaders of tomorrow -\nAll Rights Reserved.\n\n501c nonprofit tax-deductible ID 88-3463177";

  return (
    <footer className="footer">
      <div className="container">
        {/* NEWSLETTER QUAD */}
        <div className="newsletterDiv">
          <p className="newsletter-text">Join our newsletter to stay updated!</p>
          <div className="subscriptionForm">
            <input type="email" id="email" placeholder="Enter your email" className="input-box" />
            <button type="button" id="subscribe-btn" className="input-button">
              Subscribe
            </button>
          </div>
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
