import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongodb } from "./app/lib/mongodb";
import user from "./app/models/user";
import bcrypt from "bcryptjs";
import authOptions from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./db/mongodbClient";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  ...authOptions,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const email = credentials.email;
        const password = credentials.password;
        await connectMongodb();
        const findeduser = await user.findOne({ email });
        if (!findeduser) throw new Error("Invalid email or password");
        const isMatch = await bcrypt.compare(password, findeduser.password);
        if (!isMatch) throw new Error("Wrong password");
        return {
          id: findeduser._id.toString(),
          email: findeduser.email,
          name: findeduser.name,
          role: findeduser.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },
  trustHost: true,
});
