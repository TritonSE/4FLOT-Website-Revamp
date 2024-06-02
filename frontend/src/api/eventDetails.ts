import { del, get, handleAPIError, post, put } from "./requests";

import type { APIResult } from "./requests";

export type EventDetails = {
  _id: string;
  name: string;
  description: string;
  guidelines: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageURI: string;
  description_short: string;
};

export async function getEventDetails(id: string): Promise<APIResult<EventDetails>> {
  try {
    const response = await get(`/api/eventDetails/${id}`);
    const json = (await response.json()) as EventDetails;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getAllEventDetails(): Promise<APIResult<EventDetails[]>> {
  try {
    const response = await get("/api/eventDetails");
    const json = (await response.json()) as EventDetails[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export type CreateEventDetailsRequest = {
  name: string;
  description: string;
  guidelines: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageURI: string;
  description_short: string;
};

export async function createEventDetails(
  eventDetails: CreateEventDetailsRequest,
): Promise<APIResult<EventDetails>> {
  try {
    console.log("eventDetails", eventDetails);
    const response = await post("/api/eventDetails", eventDetails);
    const json = (await response.json()) as EventDetails;
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return handleAPIError(error);
  }
}

export type UpdateEventDetailsRequest = {
  _id: string;
  name: string;
  description: string;
  guidelines: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageURI: string;
  description_short: string;
};

export async function updateEventDetails(
  eventDetails: UpdateEventDetailsRequest,
): Promise<APIResult<EventDetails>> {
  try {
    const id = eventDetails._id;
    const response = await put(`/api/eventDetails/${id}`, eventDetails, {
      "Content-Type": "application/json",
    });
    const json = (await response.json()) as EventDetails;
    console.log("updateEventDetails json: ", json);
    return { success: true, data: json };
  } catch (error) {
    console.log("updateEventDetails error: ", error);
    return handleAPIError(error);
  }
}

export async function deleteEventDetails(id: string): Promise<APIResult<EventDetails>> {
  try {
    const response = await del(`/api/eventDetails/${id}`);
    const json = (await response.json()) as EventDetails;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
