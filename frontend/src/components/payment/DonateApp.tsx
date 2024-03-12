"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import DonateCard from "./DonateCard";
import DonateCardText from "./DonateCardText";
import DonateForm from "./DonateForm";

type DonateAppProps = {
  className: string;
};

export default function DonateApp({ className }: DonateAppProps) {
  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
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
          <DonateForm />
        </DonateCard>
      </PayPalScriptProvider>
    </div>
  );
}
