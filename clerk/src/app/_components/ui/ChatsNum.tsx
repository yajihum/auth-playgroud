import { getChatsNumByRoomId } from "@/lib/prisma";
import { ChatIcon } from "./Icon";

export default function ChatsNum({ id }: { id: number }) {
  const num = getChatsNumByRoomId(id);
  return (
    <div className="w-1/5 md:w-1/3 lg:w-1/4 px-3 py-2 my-4 rounded-3xl bg-orange-400/70 text-white flex">
      <p className="text-sm block mx-1">{num}</p>
      <ChatIcon />
    </div>
  );
}
