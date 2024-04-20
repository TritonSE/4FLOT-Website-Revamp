import Image from "next/image";

type ButtonProps = {
  onClick?: () => void;
};

const EmailCopyBtn = ({ onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
      <Image src="/copy_icon_light.svg" alt="Copy Emails" width={24} height={24} />
    </button>
  );
};

export default EmailCopyBtn;
