import Loading from "@/app/loading";
import { formatDate, getChats, getRoomById } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Chats from "./_components/Chats";
import Form from "./_components/Form";

export default async function Room({ params }: { params: { id: string } }) {
  const room = await getRoomById(parseInt(params.id));
  const { userId } = auth();

  if (!room) {
    return <div>ルームが見つかりませんでした</div>;
  }
  const createdDate = room.createdAt ? formatDate(room.createdAt) : undefined;

  if (!userId) {
    redirect("/sign-in");
  }

  const chats = await getChats(parseInt(params.id));

  return (
    <div className="mx-4 text-center">
      <div className="border-b border-b-gray-300 py-4 text-left">
        <h2 className="my-2 text-base md:text-2xl">{room.name}</h2>
        <div className="flex justify-between text-gray-500">
          <p className="text-xs md:text-sm">{room.description}</p>
          {createdDate && <p>作成日 : {createdDate}</p>}
        </div>
      </div>
      <div className="my-6 md:my-8">
        <Suspense fallback={<Loading />}>
          {/* @ts-expect-error Async Server Component */}
          <Chats chats={chats} />
        </Suspense>
        <Form roomId={parseInt(params.id)} userId={userId} />
      </div>
    </div>
  );
}
