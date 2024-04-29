import Image from "next/image";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  onHover: (hover: boolean) => void;
};

const EmailCopyBtn = ({ onClick, onHover }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        onHover(true);
      }}
      onMouseLeave={() => {
        onHover(false);
      }}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      <Image src="/copy_icon_light.svg" alt="Copy Emails" width={24} height={24} />
    </button>
  );
};

export default EmailCopyBtn;
