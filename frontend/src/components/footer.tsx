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
        <div className="newsletterDiv">{/* TODO: Newsletter form */}</div>
        <div className="linkDiv">{/* TODO: Links */}</div>
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
        <div className="copyrightDiv">
          <p className="copyrightText">{copyrightMessage}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
