"use client";

import Image from "next/image";

import DonateApp from "@/components/payment/DonateApp";

export default function App() {
  return (
    <>
      <div className="relative">
        <Image
          src="https://i.imgur.com/YTP7cfp.png"
          alt="Background"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      </div>
      <DonateApp className="absolute left-1/3 top-48 transform -translate-x-1/2" />
    </>
  );
}
