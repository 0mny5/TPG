import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // 初回ログイン時
      if (account && profile) {
        token.idToken = account.id_token;
        token.name = profile.name;
        token.image = profile.picture;
      }
      return token;
    },

    async session({ session, token }) {
      session.idToken = token.idToken ?? ""
      session.user.name = token.name ?? ""
      session.user.image = token.image ?? ""
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
