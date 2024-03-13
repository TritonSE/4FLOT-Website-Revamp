import Image from "next/image";

import DonateApp from "@/components/payment/DonateApp";

export default function App() {
  return (
    <>
      <Image
        src="https://i.imgur.com/YTP7cfp.png"
        alt="Background"
        width={1920}
        height={1080}
        priority
      />
      <DonateApp className="absolute top-1/4 left-1/4" />
    </>
  );
}
