import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { use, useEffect, useState } from "react";
import { useSupabase } from "./SupabaseProvder";
import { useRouter } from "next/navigation";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../lib/database.types";

export const Account = async ({
  session,
  supabase,
}: {
  session: Session;
  supabase: SupabaseClient<Database>;
}) => {
  console.log("あ");
  const updateUserTable = async (session: Session) => {
    try {
      // データがない場合は追加、ある場合は更新
      const { data, error } = await supabase
        .from("User")
        .upsert([{ uuid: session.user.id }]);

      if (error) {
        throw error;
      }
      console.log("User added/updated in User table:", data);
    } catch (error) {
      console.log("Error adding/updating user in User table:", error);
    }
  };

  if (session) {
    updateUserTable(session);
  }

  let { data: User, error } = await supabase
    .from("User")
    .select("*")
    .eq("uuid", session.user.id);

  console.log(User);

  return (
    <div>
      <h2>こんにちは！ {User ? User[0].name : "ゲスト"}さん</h2>
    </div>
  );
};
