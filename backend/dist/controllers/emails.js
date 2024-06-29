"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmail = void 0;
/*
 * Controller for the email route, /api/email.
 */
const emails_1 = require("../services/emails");
const createEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let EMAIL_SUBJECT = "";
    let EMAIL_BODY = "";
    if (req.body.type === "contact") {
        const { name, email, phone, subject, message, question } = req.body;
        // Extract question type from the selected option if it is "I have a _ question"
        let questionType = "";
        if (question === "Other") {
            questionType = "Other message";
        }
        else {
            questionType = question.split(" ").slice(3).join(" ");
            questionType = questionType[0].toUpperCase() + questionType.slice(1);
        }
        EMAIL_SUBJECT = `Contact Form: ${questionType} from ${name}`;
        EMAIL_BODY = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`;
    }
    else if (req.body.type === "volunteer") {
        const { eventName, firstName, lastName, email, phoneNumber, receiveNews } = req.body;
        const newsStr = receiveNews ? "Yes" : "No";
        EMAIL_SUBJECT = `Volunteer Form: Sign up for ${eventName} by ${firstName} ${lastName}`;
        EMAIL_BODY = `Event Name: ${eventName} \nFirst Name: ${firstName} \nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nReceive News: ${newsStr}`;
    }
    else if (req.body.type === "newsletter") {
        const { firstName, lastName, email, quarterlyUpdates, specialUpdates } = req.body;
        const quarterlyStr = quarterlyUpdates ? "Yes" : "No";
        const specialStr = specialUpdates ? "Yes" : "No";
        EMAIL_SUBJECT = `Newsletter Form: Subscription by ${firstName} ${lastName}`;
        EMAIL_BODY = `First Name: ${firstName} \nLast Name: ${lastName}\nEmail: ${email}\nReceive Quarterly Updates: ${quarterlyStr}\nReceive Special Events Updates: ${specialStr}`;
    }
    else if (req.body.type === "donation") {
        const { firstName, lastName, email, phone, comment } = req.body;
        EMAIL_SUBJECT = `Physical Donation Form: Donation from ${firstName} ${lastName}`;
        EMAIL_BODY = `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phone}\nDonation Comment:\n${comment}`;
    }
    try {
        const sentEmail = yield (0, emails_1.sendContactEmail)(EMAIL_SUBJECT, EMAIL_BODY);
        // Successfully sent email
        res.status(200).json(sentEmail);
    }
    catch (error) {
        next(error);
    }
});
exports.createEmail = createEmail;
