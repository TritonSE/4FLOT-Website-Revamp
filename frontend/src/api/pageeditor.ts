import { get, handleAPIError, put } from "./requests";

import type { APIResult } from "./requests";

export type PageSection = {
  subtitle?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
};

export type PageText = {
  page: string;
  pageSections: PageSection[];
};

export async function getPageText(page: string): Promise<APIResult<PageText>> {
  try {
    const response = await get(`/api/pageeditor/${page}`);
    const json = (await response.json()) as PageText;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updatePage(pageData: PageText): Promise<APIResult<PageText>> {
  try {
    const page = pageData.page;
    const response = await put(`/api/pageeditor/${page}`, pageData);
    const json = (await response.json()) as PageText;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

// type UpdateEventDetailsRequest = {
//   _id: string;
//   name: string;
//   description: string;
//   guidelines: string;
//   date: string;
//   location: string;
//   imageURI: string;
//   volunteers: string[];
// };

// export async function updateEventDetails(
//   eventDetails: UpdateEventDetailsRequest,
// ): Promise<APIResult<EventDetails>> {
//   try {
//     const id = eventDetails._id;
//     const response = await put(`/api/eventDetails/${id}`, eventDetails, {
//       "Content-Type": "application/json",
//     });
//     const json = (await response.json()) as EventDetails;
//     return { success: true, data: json };
//   } catch (error) {
//     return handleAPIError(error);
//   }
// }
