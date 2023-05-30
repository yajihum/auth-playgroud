"use server";

import { auth, clerkClient } from "@clerk/nextjs";

export const getUserById = async () => {
  const { userId } = auth();
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  return user;
};
