import { post } from "./requests";

export type CreateEmailRequest = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  question: string;
};

export async function sendEmail(email: CreateEmailRequest) {
  try {
    await post("/api/emails", email);
    alert("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Failed to send email.");
  }
}
