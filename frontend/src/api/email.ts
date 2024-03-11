import { APIResult, handleAPIError, post } from "./requests";
// import { createEmail } from "../../../backend/src/controllers/emails";

// export function sendEmail(name: string, email: string, message: string) {
//   try {
//     createEmail(name, email, message);

//     // await fetch("/sendEmail", {
//     //   //idk if this is supposed to be send-email
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({ name, email, message }),
//     // });
//     alert("Email sent successfully!");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     alert("Failed to send email.");
//   }
// }

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
    // const data = (await response.json()) as string;
    alert("Email sent successfully!");
    // return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Failed to send email.");
    return handleAPIError(error);
  }
}
