import React from "react";

export default function AmountPicker({ onAmountChange }) {
  return (
    <fieldset onChange={onAmountChange}>
      <legend>Donation Amount</legend>
      <div className="form-control">
        <p>
          To donate to Kitty's House, choose a donation amount and click one of
          the Donate buttons. We appreciate your generosity and thank you for
          your support!
        </p>
        <label className="label">
          <input
            type="radio"
            value="donation_5"
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
          <input
            type="radio"
            value="donation_20"
            name="productId"
            id="amountChoice2"
            className="radio"
          />
          <span className="label-text md:text-lg">$20.00</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <input
            type="radio"
            value="donation_100"
            name="productId"
            id="amountChoice3"
            className="radio"
          />
          <span className="label-text md:text-lg">$100.00</span>
        </label>
      </div>
    </fieldset>
  );
  10;
}