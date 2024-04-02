import { post } from "./requests";

export type CreateContactEmailRequest = {
  type: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  question: string;
};

export type CreateVolunteerEmailRequest = {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  receiveNews: boolean;
};

export type CreateNewsletterEmailRequest = {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  quarterlyUpdates: boolean;
  specialUpdates: boolean;
};

export async function sendEmail(
  email: CreateContactEmailRequest | CreateVolunteerEmailRequest | CreateNewsletterEmailRequest,
) {
  try {
    await post("/api/emails", email);
    // alert("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Error sending email. Please try again later.");
  }
}
