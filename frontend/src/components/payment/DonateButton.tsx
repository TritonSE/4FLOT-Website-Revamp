import { PayPalButtons } from "@paypal/react-paypal-js";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";

import { OrderData, captureOrder, createOrder } from "@/api/paypal";

type DonateButtonProps = {
  productId: string;
  quantity: string;
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

export default function DonateButton({ productId, quantity }: DonateButtonProps) {
  const productIdRef = useRef(productId);
  const quantityRef = useRef(quantity);

  useEffect(() => {
    productIdRef.current = productId;
    quantityRef.current = quantity;
  }, [productId, quantity]);

  return (
    <div className="py-3">
      <PayPalButtons
        style={{ label: "donate" }}
        createOrder={() =>
          createOrder({ productId: productIdRef.current, quantity: quantityRef.current })
        }
        onApprove={async (data, actions) => {
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
            // (3) Successful transaction -> Redirect user to success page
            await Promise.resolve(redirect("/donations/success"));
          }
        }}
      />
    </div>
  );
}
