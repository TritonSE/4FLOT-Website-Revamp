"use client";

import { useState } from "react";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import DonateCard from "./DonateCard";
import DonateCardText from "./DonateCardText";
import DonateForm from "./DonateForm";
import DonationTypeSelection from "./DonationTypeSelection";

type DonateAppProps = {
  className: string;
};

export default function DonateApp({ className }: DonateAppProps) {
  const [monetary, setMonetary] = useState(true);
  console.log(monetary ? "monetary" : "physical");
  return (
    <div className={className}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "test",
          components: "buttons",
          currency: "USD",
          enableFunding: "venmo",
        }}
      >
        <DonateCard>
          <DonateCardText />
          <DonationTypeSelection monetary={monetary} setMonetary={setMonetary} />
          <DonateForm />
        </DonateCard>
      </PayPalScriptProvider>
    </div>
  );
}
