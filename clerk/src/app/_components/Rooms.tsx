import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { InRoomIcon } from "./ui/Icon";
import { clerkClient } from "@clerk/nextjs";
import ChatsNum from "./ui/ChatsNum";

export default async function Rooms() {
  const rooms = await prisma.room.findMany();
  if (!rooms || rooms.length === 0)
    return <div className="my-2">参加可能なルームはありません</div>;

  return (
    <div className="my-10 mx-6 grid md:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <Link
          href={`/room/${room.id}`}
          className="p-5 border shadow hover:bg-gray-100 rounded-md text-left flex flex-col justify-between h-full"
          key={room.id}
        >
          <div className="flex my-4">
            <p className="mr-2 text-sm md:text-base font-semibold text-blue-500">
              {room.name}
            </p>
            <InRoomIcon />
          </div>
          <p className="text-gray-500 text-sm">{room.description}</p>
          <ChatsNum id={room.id} />
        </Link>
      ))}
    </div>
  );
}
