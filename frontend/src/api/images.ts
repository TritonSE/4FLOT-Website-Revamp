import { get, handleAPIError } from "./requests";

import type { APIResult } from "./requests";

export enum BackgroundImagePages {
  TEAM = "TEAM",
  HOME = "HOME",
  MISSION = "MISSION",
  TESTIMONIALS = "TESTIMONIALS",
}

export type BackgroundImage = {
  page: string;
  imageURI: string;
};

export async function getBackgroundImages(
  page: BackgroundImagePages,
): Promise<APIResult<BackgroundImage[]>> {
  try {
    const urlWithPage = `/api/BackgroundImage/get?page=${encodeURIComponent(page)}`;
    const response = await get(urlWithPage);
    const json = (await response.json()) as BackgroundImage[];
    console.log(json);
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
