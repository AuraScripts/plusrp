import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.discordId = profile.id;
        token.username = (profile as any).username;
        token.avatar = (profile as any).avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${(profile as any).avatar}.png`
          : null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).discordId = token.discordId;
        (session.user as any).username = token.username;
        (session.user as any).image = token.avatar || session.user.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/account",
  },
  secret: process.env.AUTH_SECRET,
});
