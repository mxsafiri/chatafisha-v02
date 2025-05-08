import { createThirdwebClient } from "thirdweb";

// Get environment variables
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

// Check if required environment variables are present
export const hasThirdwebConfig = Boolean(clientId && secretKey);

// Create the thirdweb client with required credentials if available
export const client = hasThirdwebConfig 
  ? createThirdwebClient({
      clientId: clientId as string,
      secretKey: secretKey as string,
    })
  : null;
