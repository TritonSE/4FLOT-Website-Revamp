"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type SuccessCardProps = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

const SuccessCard = ({ setSuccess }: SuccessCardProps) => {
  const handleReload = () => {
    setSuccess(false);
  };

  return (
    <div className="justify-content-center container grid w-[90%] p-8 md:w-[616px]">
      <div className="flex flex-col bg-white p-10 rounded-lg shadow-xl">
        <button
          className="w-3/5  rounded-md bg-[#694C97] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7b61a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61a3]"
          onClick={handleReload}
        >
          ← Make Another Donation
        </button>
        <div>
          <Image
            src="/donations/successGraphic.svg"
            alt="Success Image"
            quality={100}
            width={606}
            height={606}
          />
        </div>
        <h1 className="w-full text-center text-2xl font-bold card-title pb-2">
          Thank you for your generous donation!
        </h1>
      </div>
    </div>
  );
};

export default SuccessCard;
