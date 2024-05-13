const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const base = "https://api-m.sandbox.paypal.com";

/**
 * Types the CartItem and Cart objects which gets used in a createOrder request
 */
type CartItem = {
  id: string;
  amount: string; // string dollar amout, eg "5.00"
  quantity: string;
};

type Cart = CartItem[];

/**
 * Generate an OAuth 2.0 token to authenticate with PayPal REST APIs
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_PAYPAL_API_CREDENTIALS");
    }
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate PayPal Access Token: ", error);
  }
};

async function handleResponse(response: Response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (error) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export async function createOrder(cart: Cart) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  console.log("shopping cart info", cart);

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

  const response = await fetch(url, {
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
}

export async function captureOrder(orderID: string) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
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
}
