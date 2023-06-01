"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="my-4 text-lg font-semibold">
        なんらかのエラーが発生しました。リトライボタンから再度お試しください。
      </h2>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
      >
        もう一度試す
      </button>
    </div>
  );
}
