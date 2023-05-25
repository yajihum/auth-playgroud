import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <nav className="flex justify-between p-4">
        <div>
          <Link href={"/"} className="text-xl font-semibold">
            Clerk test
          </Link>
        </div>
        <div>
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton afterSignOutUrl="/" showName />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
