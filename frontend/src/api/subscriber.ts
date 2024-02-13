import { APIResult, handleAPIError, post } from "./requests";

export type Subscriber = {
  _id: string;
  email: string;
};

export type CreateSubscriberRequest = {
  email: string;
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
