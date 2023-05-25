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
  } else if (!user) {
    return null;
  }

  const { data: User, error } = await supabase
    .from("User")
    .select("*")
    .eq("uuid", user.id);

  if (error || !User) {
    console.log(error);
    return null;
  }

  console.log(user.user_metadata);

  const userImageLink =
    (User[0].avatar_url !== "" ? User[0].avatar_url : null) ||
    (user.user_metadata.avatar_url !== ""
      ? user.user_metadata.avatar_url
      : null) ||
    user.user_metadata.picture;
  const userName = User[0].name ?? user.user_metadata.name;
  const userWebsite = User[0].website ?? user.user_metadata.website;

  return (
    <div className="text-center">
      <h2>こんにちは！ {userName}さん</h2>
      <div className="flex justify-center my-4">
        <Image
          src={userImageLink}
          width={100}
          height={100}
          alt="プロフィール画像"
        />
      </div>
      <div className="text-center">
        <p>{userName}</p>
      </div>
      {userWebsite && (
        <div className="my-4">
          ウェブサイト:
          <Link href={userWebsite} className="text-blue-400 underline">
            {userWebsite}
          </Link>
        </div>
      )}
      <div className="my-4">
        <Link
          href="/account/update"
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          アカウントを編集する
        </Link>
      </div>
    </div>
  );
};

export default Account;
