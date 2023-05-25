import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  return (
    <div className="text-center">
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
    </div>
  );
}