import Image from "next/image";
import React from "react";

type SectionCardProps = {
  className?: string;
  title: string;
  description: string;
  onClick?: () => void;
  icon?: string; // controls source of icon -> <Image src=icon />
  topText?: string;
  buttonText?: string;
  showIcon?: boolean;
  showButton?: boolean;
  showTopText?: boolean;
};

export default function SectionCard({
  className = "",
  title,
  description,
  onClick,
  icon = "",
  topText = "",
  buttonText = "",
  showIcon = false,
  showButton = false,
  showTopText = false,
}: SectionCardProps) {
  return (
    <div
      className={`${className} w-[1035px] h[418px] px-[251px] py-[53px] bg-white rounded-[10px] shadow`}
    >
      <div className="flex flex-col gap-8 justify-center align-middle">
        {showTopText && (
          <p className="text-center" style={{ font: "var(--font-body)" }}>
            {topText}
          </p>
        )}
        {showIcon && <Image src={icon} alt="Icon" width={88} height={88} className="self-center" />}
        <p className="text-center" style={{ font: "var(--font-title-l)" }}>
          {title}
        </p>
        <p className="text-center" style={{ font: "var(--font-body-reg)" }}>
          {description}
        </p>
        {showButton && (
          <button
            className="self-center bg-[#E26363] text-white px-4 py-2 rounded-[10px] hover:bg-[#FF7A7A] transition-all duration-100 ease-linear"
            onClick={onClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
