import { prisma } from "@/lib/prisma";

export default async function Room({ params }: { params: { id: string } }) {
  const room = await prisma.room.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (room === null) {
    return <div>ルームが見つかりませんでした</div>;
  }

  return (
    <div className="my-10">
      <p className="text-2xl">{room.name}</p>
    </div>
  );
}
