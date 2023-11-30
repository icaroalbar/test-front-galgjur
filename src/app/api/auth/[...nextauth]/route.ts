import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from "jsonwebtoken";

import NextAuth from "next-auth";
import axios from "axios";

const api = String(process.env.API_LOGIN_USERS);

export const authOptions: any = {
  // secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/dashboard",
  },

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
          const result = await axios.post(
            api,
            {
              username: credentials.email,
              password: credentials.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            },
          );

          const { data } = result;

          const token = data.user.AuthenticationResult.AccessToken;
          const decoded: any = jwt.decode(token);
          const id = String(decoded.sub);
          const status = decoded["cognito:groups"][0];

          return Promise.resolve({
            id: id,
            access_token: token,
            status: status,
          });
        } catch (error) {
          console.error(error);
          return Promise.resolve(null);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const u = user as unknown as any;
        token.access_token = u.access_token;
        token.id = u.id;
        token.status = u.status;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token;
      session.id = token.id;
      session.status = token.status;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
