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
      createdAt: true,
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

export const createRooms = (name: string, description: string) => {
  const prisma = new PrismaClient();
  const room = prisma.room.create({
    data: {
      name: name,
      description: description,
    },
  });
  return room;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};
