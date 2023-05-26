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
    <div className="my-20">
      <form
        className="flex items-center p-4 border-t border-gray-200"
        action={handleSubmit}
      >
        <input
          type="text"
          name="message"
          autoComplete="off"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="メッセージを入力..."
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        >
          送信
        </button>
      </form>
    </div>
  );
}
