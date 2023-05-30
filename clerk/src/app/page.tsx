import { getUserById } from "@/lib/clerk";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Rooms from "./_components/Rooms";
import { ThreePointsAnimation } from "./_components/ui/Animation";

export const revalidate = 0;

export default async function Home() {
  const user = await getUserById();

  return (
    <div className="my-4 text-center">
      <div>
        <p className="mt-4 text-xl">
          こんにちは！{" "}
          <Link
            href="/account"
            className="text-orange-400 hover:border-b-2 hover:border-b-orange-400 "
          >
            {user?.username ?? "ゲスト"}
          </Link>{" "}
          さん
        </p>
      </div>
      {!user && (
        <div className="my-6">
          <Link
            href="/sign-in"
            className="rounded bg-blue-500 p-3 text-white hover:bg-blue-400"
          >
            サインイン
          </Link>
        </div>
      )}
      {user && user.profileImageUrl && (
        <Image
          src={user.profileImageUrl}
          width={100}
          height={100}
          alt="プロフィール画像"
          className="mx-auto my-4"
        />
      )}
      <div className="my-16">
        <Suspense fallback={<ThreePointsAnimation />}>
          <p className="font-medium text-gray-700">参加可能なルーム一覧</p>
          {/* @ts-expect-error Async Server Component */}
          <Rooms />
        </Suspense>
      </div>
    </div>
  );
}
