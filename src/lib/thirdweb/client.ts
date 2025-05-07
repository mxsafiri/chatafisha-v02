import { createThirdwebClient } from "thirdweb";

// Get environment variables
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

if (!clientId) {
  throw new Error("Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID environment variable");
}

if (!secretKey) {
  throw new Error("Missing THIRDWEB_SECRET_KEY environment variable");
}

// Create the thirdweb client with required credentials
export const client = createThirdwebClient({
  clientId,
  secretKey,
});
