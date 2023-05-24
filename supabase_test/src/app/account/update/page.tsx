"use client";

import { useSupabase } from "@/app/_components/SupabaseProvder";
import { redirect } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

const Account = () => {
  const [user, setUser] = useState({ name: "", website: "", avatar_url: "" });
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const supabaseCtx = useSupabase();
  const { supabase } = useSupabase();

  if (!supabaseCtx.user) {
    redirect("/");
  }

  const updateProfile = async ({
    name,
    website,
    avatar_url,
  }: {
    name: string;
    website: string;
    avatar_url: string;
  }) => {
    try {
      setLoading(true);

      const updates = {
        uuid: supabaseCtx.user!.id,
        name,
        website,
        avatar_url,
      };

      let { error } = await supabase.from("User").upsert(updates);

      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-left">
      <div className="my-6">
        <div className="py-3">
          <label
            className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            ユーザー名
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
            placeholder="Jane Doe"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label
            className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            ウェブサイトURL
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="url"
            placeholder="https://example.com"
            onChange={(e) => setUser({ ...user, website: e.target.value })}
          />
        </div>
      </div>

      <div className="my-3">
        <button
          className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-400 rounded-md"
          onClick={() => updateProfile(user)}
          disabled={loading}
          type="button"
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div className="my-3">
        <button
          className="px-3 py-2 bg-green-600 text-white hover:bg-green-500 rounded-md"
          onClick={() => supabase.auth.signOut()}
          type="button"
        >
          Sign Out
        </button>
      </div>
      <div>
        {user && (
          <p>
            You are {name} & {user.website}
          </p>
        )}
      </div>
    </div>
  );
};

export default Account;
