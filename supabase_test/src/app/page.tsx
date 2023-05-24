import Image from "next/image";
import { SignIn } from "./_components/SignIn";
import { cookies, headers } from "next/headers";
import {
  Session,
  createServerComponentSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "./lib/database.types";
import { Account } from "./_components/Account";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/account");
  }

  return <>{session ? <div></div> : <SignIn />}</>;
}
