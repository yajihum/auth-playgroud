import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const getChatsNumByRoomId = (id: number) => {
  const count = prisma.chat.count({
    where: {
      roomId: id,
    },
  });
  return count;
};

export const getRoomById = (id: number) => {
  const room = prisma.room.findUnique({
    where: { id: id },
    select: {
      name: true,
      description: true,
      chats: true,
    },
  });
  return room;
};

export const createChat = (roomId: number, userId: string, message: string) => {
  const chat = prisma.chat.create({
    data: {
      roomId: roomId,
      userId: userId,
      message: message,
    },
  });
  return chat;
};

export const getChats = (roomId: number) => {
  const chats = prisma.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return chats;
};
