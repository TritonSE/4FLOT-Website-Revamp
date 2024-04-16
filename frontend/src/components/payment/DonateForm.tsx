"use client";
import { useState } from "react";

import AmountPicker from "./AmountPicker";
import DonateButton from "./DonateButton";

export default function DonateForm() {
  const [productId, setProductId] = useState("donation_5");

  return (
    <form className="DonateForm">
      {/* <AmountPicker onAmountChange={(e) => { setProductId(e.target.value); }} /> */}
      <div className=" w-full">
        <DonateButton productId={productId} />
      </div>
    </form>
  );
}
