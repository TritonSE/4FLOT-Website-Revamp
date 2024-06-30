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
exports.captureOrder = exports.createOrder = void 0;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const ORIGIN_URL = process.env.FRONTEND_ORIGIN;
const base = "https://api-m.paypal.com";
/**
 * Generate an OAuth 2.0 token to authenticate with PayPal REST APIs
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_PAYPAL_API_CREDENTIALS");
        }
        const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
        const headersList = {
            Accept: "*/*",
            "User-Agent": `4 Future Leaders Of Tomorrow Web App (${ORIGIN_URL})`,
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${auth}`,
        };
        const response = yield fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: headersList,
        });
        const data = yield response.json();
        return data.access_token;
    }
    catch (error) {
        console.error("Failed to generate PayPal Access Token: ", error);
    }
});
function handleResponse(response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonResponse = yield response.json();
            return {
                jsonResponse,
                httpStatusCode: response.status,
            };
        }
        catch (error) {
            const errorMessage = yield response.text();
            throw new Error(errorMessage);
        }
    });
}
function createOrder(cart) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    items: [
                        {
                            name: "Donation to 4FLOT",
                            description: "Deserunt aliquip enim Lorem.",
                            quantity: "1",
                            unit_amount: {
                                currency_code: "USD",
                                value: cart[0].amount,
                            },
                            category: "DONATION",
                        },
                    ],
                    amount: {
                        currency_code: "USD",
                        value: cart[0].amount,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: cart[0].amount,
                            },
                        },
                    },
                },
            ],
        };
        const response = yield fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
            method: "POST",
            body: JSON.stringify(payload),
        });
        return handleResponse(response);
    });
}
exports.createOrder = createOrder;
function captureOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
        });
        return handleResponse(response);
    });
}
exports.captureOrder = captureOrder;
