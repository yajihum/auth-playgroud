import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Rooms from "./_components/Rooms";
import { Suspense } from "react";
import { getUserById } from "@/lib/clerk";

export default async function Home() {
  const user = await getUserById();

  return (
    <div className="text-center my-4">
      <div>
        <p className="text-xl mt-4">
          こんにちは！ {user?.username ?? "ゲスト"}さん
        </p>
      </div>
      {!user && (
        <div className="my-6">
          <Link
            href="/sign-in"
            className="p-3 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            サインイン
          </Link>
        </div>
      )}
      {user && (
        <Image
          src={user?.profileImageUrl}
          width={100}
          height={100}
          alt="プロフィール画像"
          className="mx-auto my-4"
        />
      )}
      <div className="my-16">
        <p className="font-medium text-gray-700">参加可能なルーム一覧</p>
        <Suspense fallback={<div>loading...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <Rooms />
        </Suspense>
      </div>
    </div>
  );
}
