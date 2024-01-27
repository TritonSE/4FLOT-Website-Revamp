import { get, handleAPIError } from "./requests";

import type { APIResult } from "./requests";
export type Member = {
  _id: string;
  name: string;
  role: string;
  profilePictureURL?: string;
};

export async function getAllMembers(): Promise<APIResult<Member[]>> {
  try {
    const response = await get(`/api/member/get`);
    console.log(response);
    const json = (await response.json()) as Member[];
    console.log(json);
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
