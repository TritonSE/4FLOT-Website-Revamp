import { post } from "./requests";

/**
 * Types the body for a createOrder request as Order type
 */
export type Order = {
  productId: string;
  quantity: string;
};

/**
 * Types PayPal Purchase Unit
 * @see https://developer.paypal.com/docs/api/orders/v2/#definition-purchase_unit
 */
export type PurchaseUnit = {
  reference_id?: string;
  description?: string;
  custom_id?: string;
  invoice_id?: string;
  id?: string;
  soft_descriptor?: string;
  items?: object[];
  amount?: object;
  payee?: object;
  payment_instruction?: object;
  shipping?: object;
  supplementary_data?: object;
  payments: object;
};

/**
 * Types Order from PayPal's API (Only relevant fields)
 * Also combines some types for Error objects. This is a hacky fix and probably bad practice
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 * @see https://developer.paypal.com/docs/api/orders/v2/#definition-order
 * @see https://developer.paypal.com/docs/api/orders/v2/#definition-error_details
 */
export type OrderData = {
  create_time?: string;
  update_time?: string;
  id?: string;
  processing_instruction?: string;
  purchase_units?: object[];
  links?: object[];
  payment_source?: object;
  intent?: string;
  payer?: object;
  status?: string;
  // The rest of the fields only exist on invalid/failed orders
  details?: object[];
  debug_id?: string;
};

/**
 * Function that a <PayPalButtons> element uses to set up a one time payment
 * @param productId stores data about what the customer is purchasing, for the donation page this is "donation"
 * @param quantity stores the number of productId that the customer wants to purchase, for the donation page 1 quantity = $0.01, e.g. a 5 dollar donation is represented by quantiy=500
 * @returns the orderId used to approve the order with, a string
 */
export async function createOrder({ productId, quantity }: Order): Promise<string> {
  const response = await post("/api/orders", {
    cart: [
      {
        id: productId,
        quantity,
      },
    ],
  });

  const orderData = (await response.json()) as OrderData;

  if (orderData.id) {
    return orderData.id;
  } else {
    const message = `Failed to create PayPal order: ${JSON.stringify(orderData)}`;
    throw new Error(message);
  }
}

/**
 * Captures payment after the customer has authorized the payment on the popup
 * Used in <PayPalButtons> elements onApprove prop
 * @param orderId
 * @returns an OrderData object
 */
export async function captureOrder(orderId: string): Promise<OrderData> {
  const response = await post(`/api/orders/${orderId}/capture`, {});
  const orderData = (await response.json()) as OrderData;
  return orderData;
}
