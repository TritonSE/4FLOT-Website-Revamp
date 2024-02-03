import { get, handleAPIError } from "./requests";

import type { APIResult } from "./requests";
export type Testimonial = {
  _id: string;
  quote: string;
  description: string;
  image: string;
};

export async function getAllTestimonials(): Promise<APIResult<Testimonial[]>> {
  try {
    const response = await get(`/api/testimonial/get`);
    //console.log(response);
    const json = (await response.json()) as Testimonial[];
    //console.log(json);
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
