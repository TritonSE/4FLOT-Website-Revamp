"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

import DonateCard from "./DonateCard";
import DonateCardText from "./DonateCardText";
import DonateForm from "./DonateForm";
import DonationTypeSelection from "./DonationTypeSelection";
import PhysicalDonationForm from "./PhysicalDonationForm";
import SuccessCard from "./SuccessCard";

type DonateAppProps = {
  className: string;
};

export default function DonateApp({ className }: DonateAppProps) {
  const [monetary, setMonetary] = useState(true);
  // Persisting success state only if window is defined
  const [success, setSuccess] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedSuccess = localStorage.getItem("success");
      return savedSuccess ? (JSON.parse(savedSuccess) as boolean) : false;
    }
    return false;
  });

  // Puts the state into the local storage on the clients web browser
  useEffect(() => {
    localStorage.setItem("success", JSON.stringify(success));
  }, [success]);

  // Reset the state on page reload or redirection
  useEffect(() => {
    setSuccess(false);
  }, []);

  if (!success) {
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
            {monetary ? (
              <DonateForm setSuccess={setSuccess} />
            ) : (
              <PhysicalDonationForm setSuccess={setSuccess} />
            )}
          </DonateCard>
        </PayPalScriptProvider>
      </div>
    );
  } else {
    return (
      <div className={className}>
        <SuccessCard setSuccess={setSuccess} />
      </div>
    );
  }
}
