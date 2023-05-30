import { AnguishedFaceIcon } from "@/app/_components/ui/Icon";
import { createRooms } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function Page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    console.log(formData);
    const [name, description] = [
      formData.get("name") as string,
      formData.get("description") as string,
    ];
    const room = await createRooms(name, description);
    redirect(`/room/${room.id}`);
  }
  return (
    <div className="mx-4 my-10 flex flex-col-reverse bg-white md:flex-row">
      <form className="flex basis-1/2 flex-col gap-10" action={handleSubmit}>
        <div>
          <p className="my-3">
            <label htmlFor="name">🍊ルームの名前</label>
          </p>
          <input
            type="text"
            name="name"
            autoComplete="off"
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="メッセージを入力..."
          />
        </div>
        <div>
          <p className="my-3">
            <label htmlFor="description">🍊どんなルームですか？</label>
          </p>
          <textarea
            name="description"
            autoComplete="off"
            className="h-40 w-full rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="メッセージを入力..."
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white focus:border-blue-300 focus:outline-none focus:ring"
        >
          ルームをつくる
        </button>
      </form>
      <div className="my-6 flex basis-1/2 items-center justify-center md:justify-end ">
        <AnguishedFaceIcon />
      </div>
    </div>
  );
}
