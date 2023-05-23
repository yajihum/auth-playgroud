import Image from "next/image";
import { SignIn } from "./_components/SignIn";
import { cookies, headers } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./lib/database.types";

export default async function Home() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session) {
  //   // 認証情報を元にUserテーブルに追加
  //   const { data: User, error } = await supabase
  //     .from("User")
  //     .insert([{ uuid: session.user.id }, { name: "ゲスト" }]);
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!session ?? <SignIn />}
      <div></div>
    </main>
  );
}
