import { get, handleAPIError } from "./requests";

import type { APIResult } from "./requests";
export type Event = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

export async function getAllEvents(): Promise<APIResult<Event[]>> {
  try {
    const response = await get(`/api/events/get`);
    const json = (await response.json()) as Event[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
