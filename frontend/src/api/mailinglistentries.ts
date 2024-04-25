import { get, handleAPIError, post, put, deletedEntry } from "./requests";
import type { APIResult } from "./requests";

export type MailingListEntries = {
  id: number
  email: string;
  memberSince : string;
  firstName: string;
  lastName: string;
};

export async function getMailingListEntry(id: number): Promise<APIResult<MailingListEntries>> {
  try {
    const response = await get(`/api/mailinglistentries/${id}`);
    const json = (await response.json()) as MailingListEntries;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getAllMailingListEntries(): Promise<APIResult<MailingListEntries[]>> {
  try {
    const response = await get("/api/mailinglistentries");
    const json = (await response.json()) as MailingListEntries[];
    const mailinglistentries = [];
    for (const entry of json) {
      mailinglistentries.push(entry);
    }
    return { success: true, data: mailinglistentries };
  } catch (error) {
    console.log(error);
    return handleAPIError(error);
  }
}

export async function createMailingListEntry(entry: MailingListEntries): Promise<APIResult<MailingListEntries>> {
  try {
    const response = await post("/api/mailinglistentries", entry);
    const json = (await response.json()) as MailingListEntries;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateMailingListEntry(entry: MailingListEntries): Promise<APIResult<MailingListEntries>> {
  try {
    const id = entry.id;
    const response = await put(`/api/mailinglistentries/${id}`, entry, {
      "Content-Type": "application/json",
    });
    const json = (await response.json()) as MailingListEntries;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }

}

export async function deleteMailingListEntry(id: number): Promise<APIResult<any>> {
  try {
    const response = await deletedEntry(`/api/mailinglistentries/${id}`);
    // Check for successful deletion (assuming the server returns a 204 No Content on success)
    const json = (await response.json()) as MailingListEntries;
    return { success: true, data: json };
    console.log("been 1243 here")

  } catch (error) {
    return handleAPIError(error);
  }
}