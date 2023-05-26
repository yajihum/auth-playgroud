import { ArrowBottomIcon } from "@/app/_components/ui/Icon";
import { getUserById } from "@/lib/clerk";
import { auth } from "@clerk/nextjs";
import { Chat } from "@prisma/client";
import Image from "next/image";

export default async function Chats({ chats }: { chats: Chat[] }) {
  if (!chats || chats.length === 0)
    return (
      <div className="flex flex-col gap-3 justify-center items-center">
        <p>チャットがありません🥺</p>
        <p>みんなに話しかけてみましょう！</p>
        <ArrowBottomIcon />
      </div>
    );

  const chatList = await Promise.all(
    chats.map(async (chat) => {
      const user = await getUserById();
      return {
        id: chat.id,
        name: user?.username,
        profileImageUrl: user?.profileImageUrl,
        message: chat.message,
        isMe: chat.userId === auth().userId,
      };
    })
  );

  return (
    <div className="text-left mx-3">
      {chatList.map((chat) => {
        const isMeClass = chat.isMe ? "flex-row-reverse" : "";
        return (
          <div key={chat.id} className={`p-3 flex items-start ${isMeClass}`}>
            <div className="flex flex-col items-center">
              {chat.profileImageUrl ? (
                <Image
                  src={chat.profileImageUrl}
                  width={50}
                  height={50}
                  alt={chat.name ?? ""}
                />
              ) : (
                <div>😃</div>
              )}
              <p className="text-gray-500 text-sm text-center">
                {chat.name ?? "ゲスト"}
              </p>
            </div>
            <p className="mx-4 p-4 justify-self-stretch">{chat.message}</p>
          </div>
        );
      })}
    </div>
  );
}
