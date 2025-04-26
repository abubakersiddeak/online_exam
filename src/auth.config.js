import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [CredentialsProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token?.id;
        session.user.role = token?.role;
        console.log(` session come from auth file : ${session.user.role}  `);
      }
      return session;
    },
  },
};

export default authOptions;
