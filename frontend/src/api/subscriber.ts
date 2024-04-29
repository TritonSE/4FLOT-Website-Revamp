import { APIResult, del, get, handleAPIError, post } from "./requests";

export type Subscriber = {
  _id: string;
  email: string;
  memberSince?: string;
  firstName?: string;
  lastName?: string;
  quarterlyUpdates?: boolean;
  specialUpdates?: boolean;
};

export type CreateSubscriberRequest = {
  email: string;
  firstName?: string;
  lastName?: string;
  quarterlyUpdates?: boolean;
  specialUpdates?: boolean;
};

export async function createSubscriber(
  subscriber: CreateSubscriberRequest,
): Promise<APIResult<Subscriber>> {
  try {
    const response = await post("/api/subscribers", subscriber);
    const data = (await response.json()) as Subscriber;
    return { success: true, data };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getAllSubscribers(): Promise<APIResult<Subscriber[]>> {
  try {
    const response = await get("/api/subscribers");
    const json = (await response.json()) as Subscriber[];
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return handleAPIError(error);
  }
}

export async function deleteSubscriber(id: string): Promise<APIResult<Subscriber>> {
  try {
    const response = await del(`/api/subscribers/${id}`);
    const json = (await response.json()) as Subscriber;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
