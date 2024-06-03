import { del, get, handleAPIError, post, put } from "./requests";

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
    const json = (await response.json()) as Member[];

    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

type CreateMemberRequest = {
  name: string;
  role: string;
  profilePictureURL?: string;
};

export async function createMember(member: CreateMemberRequest): Promise<APIResult<Member>> {
  try {
    const response = await post("/api/member/post", member);
    const json = (await response.json()) as Member;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

type updateMemberRequest = {
  _id: string;
  name: string;
  role: string;
  profilePictureURL?: string;
};

export async function updateMember(member: updateMemberRequest): Promise<APIResult<Member>> {
  try {
    const id = member._id;
    const response = await put(`/api/member/${id}`, member, {
      "Content-Type": "application/json",
    });
    const json = (await response.json()) as Member;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

type cancelMemberRequest = {
  _id: string;
  name: string;
  role: string;
  profilePictureURL?: string;
};

export async function deleteMember(member: cancelMemberRequest): Promise<APIResult<Member>> {
  try {
    const id = member._id;
    const response = await del(`/api/member/${id}`);
    const json = (await response.json()) as Member;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
