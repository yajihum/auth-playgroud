import { createClerkClient } from "@clerk/nextjs/dist/server";

const options = {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.NEXT_PUBLIC_CLERK_SECRET_KEY,
};

const num = createClerkClient(options);
