"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import AmountPicker from "./AmountPicker";
import DonateButton from "./DonateButton";

type DonateFormProps = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export default function DonateForm({ setSuccess }: DonateFormProps) {
  const [amount, setAmount] = useState("5.00");
  const [amountUpdated, setAmountUpdated] = useState(false);

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    setAmountUpdated(true);
  };

  // Initialize handleAmountChange once to load the donate button
  useEffect(() => {
    handleAmountChange("5.00");
  }, []);

  return (
    <form className="DonateForm">
      <AmountPicker onAmountChange={handleAmountChange} />
      <div className=" w-full pt-[16px]">
        {amountUpdated && <DonateButton setSuccess={setSuccess} amount={amount} />}
      </div>
    </form>
  );
}
