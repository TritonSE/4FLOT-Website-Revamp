import { PayPalButtons } from "@paypal/react-paypal-js";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { OrderData, captureOrder, createOrder } from "@/api/paypal";

type DonateButtonProps = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
  amount: string; // String representation of a donation amount, e.g. "5.00"
};

/**
 * Types error details
 * @see https://developer.paypal.com/docs/api/orders/v2/#definition-error_details
 */
type ErrorDetail = {
  field: string;
  value: string;
  location: string;
  issue: string;
  description: string;
};

export default function DonateButton({ setSuccess, amount }: DonateButtonProps) {
  const amountRef = useRef(amount);

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  return (
    <div className="py-3">
      <PayPalButtons
        style={{ label: "donate" }}
        createOrder={() => {
          return createOrder({ productId: "donation", amount: amountRef.current, quantity: "1" });
        }}
        onApprove={async (data: { orderID: string }, actions: { restart: () => void }) => {
          const orderData = captureOrder(data.orderID) as OrderData;

          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message
          const errorDetail = orderData?.details?.[0] as ErrorDetail; // if error, order.Data.details exists and the 0th element holds the highest precedence issue

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            actions.restart();
            await Promise.resolve();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
          } else {
            // (3) Successful transaction -> Set the state of the page to success
            setSuccess(true);
            await Promise.resolve();
          }
        }}
      />
    </div>
  );
}
