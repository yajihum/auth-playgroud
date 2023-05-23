"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";
import { useSupabase } from "./SupabaseProvder";

export const SignIn = () => {
  const { supabase } = useSupabase();

  return (
    <Auth
      supabaseClient={supabase}
      providers={["github", "google"]}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#000",
            },
          },
        },
      }}
      redirectTo="/"
    />
  );
};
