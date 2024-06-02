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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
/**
 * Sends a notification email to 4FLOT staff when a contact email is submitted.
 * Throws an error if the email could not be sent.
 */
const sendContactEmail = (subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    const EMAIL_SUBJECT = `${subject}`;
    const EMAIL_BODY = `${message}`;
    const transporter = nodemailer_1.default.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: validateEnv_1.default.EMAIL_USER,
            pass: validateEnv_1.default.EMAIL_APP_PASSWORD,
        },
    });
    const mailOptions = {
        from: validateEnv_1.default.EMAIL_USER,
        to: validateEnv_1.default.EMAIL_NOTIFICATIONS_RECIPIENT,
        subject: EMAIL_SUBJECT,
        text: EMAIL_BODY,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendContactEmail = sendContactEmail;
