import { get, handleAPIError, put } from "./requests";

import type { APIResult } from "./requests";

export type Page = {
  name: string;
  isEdited: boolean;
  fields: Field[];
};

export type Field = {
  name: string;
  type: string;
  data: TextData | ImageData | GalleryData;
};

export type TextData = {
  text: string;
};

export type ImageData = {
  image: string;
  hasImage: boolean;
};

export type GalleryData = {
  images: string[];
  maxImages: number;
};

export async function getPageData(name: string): Promise<APIResult<Page>> {
  try {
    const response = await get(`/api/pageeditor/${name}`);
    const json = (await response.json()) as Page;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updatePageData(name: string, newPage: Page): Promise<APIResult<Page>> {
  try {
    const response = await put(`/api/pageeditor/${name}`, newPage, {
      "Content-Type": "application/json",
    });
    const json = (await response.json()) as Page;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
