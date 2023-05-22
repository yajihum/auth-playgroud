import GithubProvider from "next-auth/providers/github";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  //   session: {
  //     strategy: "jwt",
  //   },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60, // 30 days
    // Seconds - How often to re-sign and update the session / jwt.
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
