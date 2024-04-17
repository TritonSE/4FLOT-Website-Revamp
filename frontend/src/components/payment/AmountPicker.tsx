"use client";
import React, { useState } from "react";

type AmountPickerProps = {
  handleAmountChange: (newAmount: string) => void;
};

export default function AmountPicker({ handleAmountChange }: AmountPickerProps) {
  const [customAmount, setCustomAmount] = useState("0.00");

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAmountChange(e.target.value);
  };

  return (
    <fieldset>
      <legend>
        <p className="py-3 font-bold">Select your donation amount:</p>
      </legend>
      <div className="form-control">
        <label className="label">
          <input
            type="radio"
            value={"5.00"}
            defaultChecked
            name="productId"
            className="radio checked"
            id="amountChoice1"
            onChange={onAmountChange}
          />
          <span className="label-text md:text-lg">$5.00</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <input
            type="radio"
            value={"20.00"}
            name="productId"
            id="amountChoice2"
            className="radio"
            onChange={onAmountChange}
          />
          <span className="label-text md:text-lg">$20.00</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <input
            type="radio"
            value={"100.00"}
            name="productId"
            id="amountChoice3"
            className="radio"
            onChange={onAmountChange}
          />
          <span className="label-text md:text-lg">$100.00</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <input
            type="radio"
            value={customAmount}
            name="productId"
            id="amountChoice3"
            className="radio"
            onChange={onAmountChange}
          />
          <span className="label-text md:text-lg">Custom Amount:</span>
          <input
            type="number"
            name="customAmount"
            id="customAmount"
            className="input"
            onChange={(e) => {
              console.log(customAmount);
              const value = parseFloat(e.target.value);
              if (value >= 0) {
                const formattedValue = value.toFixed(2);
                handleAmountChange(formattedValue);
                console.log("formatted ", formattedValue);
              }
            }}
          />
        </label>
      </div>
    </fieldset>
  );
}
