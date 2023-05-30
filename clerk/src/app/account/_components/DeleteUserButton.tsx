"use client";

import { ThreePointsAnimation } from "@/app/_components/ui/Animation";
import { useClerk } from "@clerk/nextjs";
import { useTransition } from "react";

export default function DeleteUserButton({
  deleteUser,
}: {
  deleteUser: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const { signOut } = useClerk();
  return (
    <button
      type="button"
      onClick={() =>
        startTransition(() => {
          deleteUser();
          signOut();
        })
      }
      className="rounded bg-orange-400 p-3 text-white hover:bg-orange-300"
    >
      {isPending ? <ThreePointsAnimation /> : "アカウントを削除する"}
    </button>
  );
}
