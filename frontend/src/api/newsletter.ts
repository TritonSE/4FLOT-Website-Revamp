import { del, get, handleAPIError, post, put } from "./requests";

import type { APIResult } from "./requests";

export type Newsletter = {
  _id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  content: string;
};

export type CreateNewsletterRequest = {
  image: string;
  title: string;
  description: string;
  date: string;
  content: string;
};

export async function getNewsletter(id: string): Promise<APIResult<Newsletter>> {
  try {
    const response = await get(`/api/newsletter/${id}`);
    const json = (await response.json()) as Newsletter;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getAllNewsletters(): Promise<APIResult<Newsletter[]>> {
  try {
    const response = await get("/api/newsletter");
    const json = (await response.json()) as Newsletter[];
    const newsletters = [];
    for (const newsletter of json) {
      newsletters.push(newsletter);
    }
    return { success: true, data: newsletters };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function createNewsletter(
  newsletter: CreateNewsletterRequest,
): Promise<APIResult<Newsletter>> {
  try {
    const response = await post("/api/newsletter", newsletter);
    const json = (await response.json()) as Newsletter;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateNewsletter(newsletter: Newsletter): Promise<APIResult<Newsletter>> {
  try {
    const id = newsletter._id;
    const response = await put(`/api/newsletter/${id}`, newsletter, {
      "Content-Type": "application/json",
    });
    const json = (await response.json()) as Newsletter;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function deleteNewsletter(id: string): Promise<APIResult<Newsletter>> {
  try {
    const response = await del(`/api/newsletter/${id}`);
    const json = (await response.json()) as Newsletter;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
