import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/signIn"} className="bg-slate-200 rounded-full px-3 py-2">
        Login
      </Link>
    </main>
  );
}
