import { getChats, getRoomById } from "@/lib/prisma";
import Chats from "./_components/Chats";
import Form from "./_components/Form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Room({ params }: { params: { id: string } }) {
  const room = await getRoomById(parseInt(params.id));
  const { userId } = auth();

  if (!room) {
    return <div>ルームが見つかりませんでした</div>;
  }

  if (!userId) {
    redirect("/sign-in");
  }

  const chats = await getChats(parseInt(params.id));

  return (
    <div className="my-10 text-center">
      <h2 className="text-2xl my-2">{room.name}</h2>
      <p className="text-gray-500 text-sm">{room.description}</p>
      <div className="my-16">
        <Suspense fallback={<div>loading...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <Chats chats={chats} />
        </Suspense>
        <Form roomId={parseInt(params.id)} userId={userId} />
      </div>
    </div>
  );
}
