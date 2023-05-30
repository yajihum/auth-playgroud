import { ThreePointsAnimation } from "@/app/_components/ui/Animation";
import { getChats, getRoomById } from "@/lib/prisma";
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

  if (!userId) {
    redirect("/sign-in");
  }

  const chats = await getChats(parseInt(params.id));

  return (
    <div className="mx-4 my-10 text-center">
      <h2 className="my-2 text-2xl">{room.name}</h2>
      <p className="text-sm text-gray-500">{room.description}</p>
      <div className="my-16">
        <Suspense fallback={<ThreePointsAnimation />}>
          {/* @ts-expect-error Async Server Component */}
          <Chats chats={chats} />
        </Suspense>
        <Form roomId={parseInt(params.id)} userId={userId} />
      </div>
    </div>
  );
}
