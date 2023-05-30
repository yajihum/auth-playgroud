import { createChat } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default function Form({
  roomId,
  userId,
}: {
  roomId: number;
  userId: string;
}) {
  async function handleSubmit(formData: FormData) {
    "use server";
    const message = formData.get("message") as string;
    await createChat(roomId, userId, message);

    revalidatePath(`/room/${roomId}`);
  }

  return (
    <div className="my-10 bg-white">
      <form
        className="flex items-center border-t border-gray-200 p-4"
        action={handleSubmit}
      >
        <input
          type="text"
          name="message"
          autoComplete="off"
          className="flex-grow rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="メッセージを入力..."
        />
        <button
          type="submit"
          className="ml-4 rounded-lg bg-blue-500 px-4 py-2 text-white focus:border-blue-300 focus:outline-none focus:ring"
        >
          送信
        </button>
      </form>
    </div>
  );
}
