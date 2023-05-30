import { UserProfile, auth, clerkClient } from "@clerk/nextjs";
import DeleteUserButton from "./_components/DeleteUserButton";

export default async function Header() {
  async function deleteUser() {
    "use server";
    const { userId } = auth();
    if (!userId) return;
    await clerkClient.users.deleteUser(userId);
  }
  return (
    <div>
      <UserProfile />
      <div className="my-16 flex flex-col items-center">
        <DeleteUserButton deleteUser={deleteUser} />
      </div>
    </div>
  );
}
