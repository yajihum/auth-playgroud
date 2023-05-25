import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { InRoomIcon } from "./Icon";
import { clerkClient } from "@clerk/nextjs";

export default async function Rooms() {
  const rooms = await prisma.room.findMany();
  if (!rooms || rooms.length === 0)
    return <div className="my-2">参加可能なルームはありません</div>;

  return (
    <div className="my-10">
      {rooms.map((room) => (
        <Link
          href={`/room/${room.id}`}
          className="p-6 border shadow hover:bg-gray-100 rounded-md block text-left"
          key={room.id}
        >
          <div className="flex my-2">
            <p className="mr-2 text-xl">{room.name}</p>
            <InRoomIcon />
          </div>
          <p className="text-gray-500 text-sm">{room.description}</p>
        </Link>
      ))}
    </div>
  );
}
