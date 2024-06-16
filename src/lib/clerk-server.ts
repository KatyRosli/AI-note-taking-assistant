import { createClerkClient } from "@clerk/backend";

// Ensure the environment variable is set
if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("CLERK_SECRET_KEY is not defined in the environment");
}

// Initialize the Clerk client
export const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
