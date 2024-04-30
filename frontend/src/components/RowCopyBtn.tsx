import Image from "next/image";

type ButtonProps = {
  onClick?: () => void;
};

const RowCopyBtn = ({ onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
      <Image src="/copy.svg" alt="Copy Row" width={32} height={32} />
    </button>
  );
};

export default RowCopyBtn;
