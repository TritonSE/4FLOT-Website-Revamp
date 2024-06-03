import { get, handleAPIError, put } from "./requests";

import type { APIResult } from "./requests";
export type Record = {
  _id: string;
  card: string;
  date: string;
};

export async function getRecord(card: string): Promise<APIResult<Record>> {
  try {
    const response = await get(`/api/records/${card}`);
    const json = (await response.json()) as Record;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateRecord(card: string): Promise<APIResult<Record>> {
  try {
    const updatedRecord = { card, date: new Date().toLocaleString() };
    const response = await put(`/api/records/${card}`, updatedRecord, {
      "Content-Type": "application/json",
    });
    const json = (await response.json()) as Record;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
