// WhiteCard.tsx
import Image from "next/image";
import React from "react";
import "./white-card.css"; // Import the CSS file for the white cards

type WhiteCardProps = {
  title: string;
  description: string;
  verticalPosition: string; // Accepts a percentage value for vertical position
  imageUrl: string;
};

const WhiteCard: React.FC<WhiteCardProps> = ({
  title,
  description,
  imageUrl,
  verticalPosition,
}) => {
  const cardStyle = {
    width: "71.875%", // 1035px / 1440px
    height: "19.1608%", // 418px / 2184px
    top: verticalPosition,
    left: "14%", // 203px / 1440px
    // padding: "3.3333%", // 53px / 1440px
    // borderRadius: "0.7292%", // 10px / 1440px
    // gap: "1.4815%", // 32px / 2184px
  };

  return (
    <div className="white-card-container" style={cardStyle}>
      <div className="card-image-container">
        <Image
          src={imageUrl}
          alt="Card image"
          layout="fill"
          objectFit="cover"
          className="card-image"
          priority
        />
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="button-container">
        <button className="button-text">Learn more</button>
      </div>
    </div>
  );
};

export default WhiteCard;
