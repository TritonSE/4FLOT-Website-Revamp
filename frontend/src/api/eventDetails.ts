import { get, handleAPIError, post, put } from "./requests";

import type { APIResult } from "./requests";

export type EventDetails = {
  _id: string;
  name: string;
  description: string;
  guidelines: string;
  date: string;
  location: string;
  imageURI: string;
  volunteers: string[];
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
    const events = [];
    for (const ev of json) {
      // put each event in the event array
      events.push(ev);
    }
    return { success: true, data: events };
  } catch (error) {
    return handleAPIError(error);
  }
}

type CreateEventDetailsRequest = {
  name: string;
  description: string;
  guidelines: string;
  date: string;
  location: string;
  imageURI: string;
  // volunteers: string[]; when creating an event, no volunteers are added
};

export async function createEventDetails(
  eventDetails: CreateEventDetailsRequest,
): Promise<APIResult<EventDetails>> {
  try {
    const response = await post("/api/eventDetails", eventDetails);
    const json = (await response.json()) as EventDetails;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

type UpdateEventDetailsRequest = {
  _id: string;
  name: string;
  description: string;
  guidelines: string;
  date: string;
  location: string;
  imageURI: string;
  volunteers: string[];
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
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

// wrap updateEventDetails to push a volunteer ID to an event
export async function addVolunteerToEvent(
  eventId: string,
  volunteerId: string,
): Promise<APIResult<EventDetails>> {
  try {
    const result = await getEventDetails(eventId);
    if (!result.success) {
      // if result is not successful, return the result which is APIError
      return result;
    }
    const oldEvent = result.data;
    oldEvent.volunteers.push(volunteerId);
    const response = await updateEventDetails(oldEvent);

    if (!response.success) {
      // if response is not successful, return the response which is APIError
      return response;
    }
    return { success: true, data: response.data };
  } catch (error) {
    return handleAPIError(error);
  }
}
