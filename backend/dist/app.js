"use strict";
/**
 * Defines server and middleware.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = require("http-errors");
const subscriber_1 = __importDefault(require("src/routes/subscriber"));
const members_1 = __importDefault(require("src/routes/members"));
const background_images_1 = __importDefault(require("src/routes/background_images"));
const eventDetails_1 = __importDefault(require("./routes/eventDetails"));
const volunteerDetails_1 = __importDefault(require("./routes/volunteerDetails"));
const testimonial_1 = __importDefault(require("src/routes/testimonial"));
const newsletter_1 = __importDefault(require("src/routes/newsletter")); // Import newsletter routes
const emails_1 = __importDefault(require("src/routes/emails"));
const pageeditor_1 = __importDefault(require("src/routes/pageeditor"));
const paypal_1 = __importDefault(require("src/routes/paypal"));
const app = (0, express_1.default)();
// initializes Express to accept JSON in the request/response body
app.use(express_1.default.json());
// sets the "Access-Control-Allow-Origin" header on all responses to allow
// requests from the frontend, which has a different origin - see the following
// pages for more info:
// https://expressjs.com/en/resources/middleware/cors.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN,
}));
// Routes ( e.g. app.use("/api/task", taskRoutes); )
app.use("/api/subscribers", subscriber_1.default);
app.use("/api/member", members_1.default);
app.use("/api/BackgroundImage", background_images_1.default);
app.use("/api/eventDetails", eventDetails_1.default);
app.use("/api/volunteerDetails", volunteerDetails_1.default);
app.use("/api/testimonial", testimonial_1.default);
app.use("/api/newsletter", newsletter_1.default);
app.use("/api/emails", emails_1.default);
app.use("/api/pageeditor", pageeditor_1.default);
app.use("/api/orders", paypal_1.default); // Donation Order routes
/**
 * Error handler; all errors thrown by server are handled here.
 * Explicit typings required here because TypeScript cannot infer the argument types.
 *
 * An eslint-disable is being used below because the "next" argument is never used. However,
 * it is still required for Express to recognize it as an error handler. For this reason, I've
 * disabled the eslint error. This should be used sparingly and only in situations where the lint
 * error cannot be fixed in another way.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    // 500 is the "internal server error" error code, this will be our fallback
    let statusCode = 500;
    let errorMessage = "An error has occurred.";
    // check is necessary because anything can be thrown, type is not guaranteed
    if ((0, http_errors_1.isHttpError)(error)) {
        // error.status is unique to the http error class, it allows us to pass status codes with errors
        statusCode = error.status;
        errorMessage = error.message;
    }
    // prefer custom http errors but if they don't exist, fallback to default
    else if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
exports.default = app;
