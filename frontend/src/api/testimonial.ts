import { del, get, handleAPIError, post, put } from "./requests";

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

export async function getAllQuotes(): Promise<APIResult<Testimonial[]>> {
  try {
    const response = await get(`/api/testimonial/get/quote`);
    const json = (await response.json()) as Testimonial[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export type CreateTestimonialRequest = {
  title: string;
  description: string;
  image: string;
  type: string;
};

export async function createTestimonial(
  testimonial: CreateTestimonialRequest,
): Promise<APIResult<Testimonial>> {
  try {
    const response = await post(`/api/testimonial/post`, testimonial);
    const data = (await response.json()) as Testimonial;
    return { success: true, data };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateTestimonial(testimonial: Testimonial): Promise<APIResult<Testimonial>> {
  try {
    const id = testimonial._id;
    const response = await put(`/api/testimonial/${id}`, testimonial, {
      "Content-Type": "application/json",
    });
    const json = (await response.json()) as Testimonial;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function deleteTestimonial(id: string): Promise<APIResult<Testimonial>> {
  try {
    const response = await del(`/api/testimonial/${id}`);
    const json = (await response.json()) as Testimonial;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
