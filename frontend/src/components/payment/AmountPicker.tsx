"use client";
import React, { useState } from "react";

export default function AmountPicker({ onAmountChange }) {
  const [customAmount, setCustomAmount] = useState(0);

  return (
    <fieldset onChange={onAmountChange}>
      <legend>
        <p className="py-3 font-bold">Select your donation amount:</p>
      </legend>
      <div className="form-control">
        <label className="label">
          <input
            type="radio"
            value={5}
            defaultChecked
            name="productId"
            className="radio checked"
            id="amountChoice1"
          />
          <span className="label-text md:text-lg">$5.00</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <input type="radio" value={20} name="productId" id="amountChoice2" className="radio" />
          <span className="label-text md:text-lg">$20.00</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <input type="radio" value={100} name="productId" id="amountChoice3" className="radio" />
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
          />
          <span className="label-text md:text-lg">Custom Amount:</span>
          <input
            type="number"
            name="customAmount"
            id="customAmount"
            className="input"
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                setCustomAmount(Number(e.target.value));
              }
            }}
          />
        </label>
      </div>
    </fieldset>
  );
  10;
}
