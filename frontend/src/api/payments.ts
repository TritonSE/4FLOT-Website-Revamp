import { handleAPIError, post } from "./requests";

import type { APIResult } from "./requests";


export async function createPaypalOrder(amount: number){
  try {
    const paymentData = { amount }
    const response = await post(`/api/payments/post`, paymentData);
    console.log(json);
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
