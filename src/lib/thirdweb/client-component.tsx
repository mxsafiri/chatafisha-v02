'use client';

import { createThirdwebClient } from "thirdweb";

// Get environment variables from the browser environment
// These must be NEXT_PUBLIC_ prefixed to be available on the client
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

// Create the client-side thirdweb client
export const clientSide = clientId 
  ? createThirdwebClient({
      clientId: clientId,
    })
  : null;

// Log to help with debugging
if (!clientId) {
  console.error("ThirdWeb ClientID not found in environment variables");
} else {
  console.log("ThirdWeb ClientID found:", clientId.substring(0, 5) + "...");
}
