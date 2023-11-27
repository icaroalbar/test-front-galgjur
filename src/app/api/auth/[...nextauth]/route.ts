import axios from "axios";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const api: string = process.env.URL_API;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
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
          const response = await axios.post(api, {
            username: credentials.email,
            password: credentials.password,
          });
          const { data } = response;

          
          return {
            id: 123,
            email: "thomasrubinski@gmail.com",
            name: "Thomas Rubinski",
            id_token: data.user.AuthenticationResult.IdToken,
            access_token: data.user.AuthenticationResult.AccessToken,
            key: "Você está logado!",
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        token.id = u.id;
        token.access_token = u.access_token;
        token.id_token = u.id_token;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      session.id = token.id;
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
