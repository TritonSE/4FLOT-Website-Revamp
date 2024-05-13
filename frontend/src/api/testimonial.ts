import { get, handleAPIError } from "./requests";

import type { APIResult } from "./requests";
export type Testimonial = {
  _id: string;
  title: string;
  description: string;
  image: string;
  type: string;
};

export async function getAllTestimonials(): Promise<APIResult<Testimonial[]>> {
  try {
    const response = await get(`/api/testimonial/get`);
    const json = (await response.json()) as Testimonial[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
