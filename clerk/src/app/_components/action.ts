"use server";

import { createChat, createRooms } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createRoomAction = async (name: string, description: string) => {
  const room = await createRooms(name, description);
  return room;
};

export const createChatAction = async (
  roomId: number,
  userId: string,
  message: string
) => {
  await createChat(roomId, userId, message);
  revalidatePath(`/room/${roomId}`);
};
