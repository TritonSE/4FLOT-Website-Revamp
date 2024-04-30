import Image from "next/image";

type ButtonProps = {
  onClick?: () => void;
};

const RowDeleteBtn = ({ onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
      <Image src="/trash_icon.svg" alt="Delete Row" width={32} height={32} />
    </button>
  );
};

export default RowDeleteBtn;
