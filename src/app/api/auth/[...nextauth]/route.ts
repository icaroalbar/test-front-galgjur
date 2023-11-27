import axios from "axios";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "sign-in",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        try {
          const { data: user } = await axios.post(
            "https://fqz2wwukoa.execute-api.us-east-1.amazonaws.com/dev/",
            {
              username: credentials.email,
              password: credentials.password,
            },
          );

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/dashboard",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
