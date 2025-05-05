import { createThirdwebClient } from "thirdweb";

// Get environment variables
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

// For development, use hardcoded values if environment variables are not available
const fallbackClientId = "ca9743db31afc16361f41ee8df069689"; // Use your client ID from .env
const fallbackSecretKey = "BBw74vlAex5EHG_DSSXeWW5PkyBKZwbgugfXqBzdHbMVeBaHCIak6iBvUrAs9MjHeKrUgut_gaz7EeeDWiIgNQ"; // Use your secret key from .env

// Create the thirdweb client with the available credentials
export const client = createThirdwebClient({
  clientId: clientId || fallbackClientId,
  secretKey: secretKey || fallbackSecretKey,
});
