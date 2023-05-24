import { redirect, useRouter } from "next/navigation";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const Account = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session) {
    redirect("/");
  }

  if (!user) {
    return null;
  }

  const userImageLink =
    user.user_metadata.avatar_url ?? user.user_metadata.picture;

  return (
    <div className="text-center">
      <h2>こんにちは！ {user.user_metadata.name}さん</h2>
      <div className="flex justify-center my-4">
        <Image
          src={userImageLink}
          width={100}
          height={100}
          alt="プロフィール画像"
        />
      </div>
      <div className="text-center">
        <p>{user.user_metadata.name}</p>
      </div>
      <div className="my-4">
        <Link href="/account/update" className="text-blue-400 underline">
          プロフィールを編集する
        </Link>
      </div>
    </div>
  );
};

export default Account;
