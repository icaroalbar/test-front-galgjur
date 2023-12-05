import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from "jsonwebtoken";

import NextAuth from "next-auth";
import axios from "axios";

const api = String(process.env.API_LOGIN_USERS);

export const authOptions: any = {
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
          const resultCognito = await axios.post(
            api,
            {
              username: credentials.email,
              password: credentials.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            },
          );

          const { data } = resultCognito;

          const access_token = data.user.AuthenticationResult.AccessToken;
          const decoded: any = jwt.decode(access_token);
          const id = String(decoded.sub);
          const role = decoded["cognito:groups"][0];

          const resultDatabase = await axios.post(
            "http://localhost:8080/login/hello",

            { id },
            {
              headers: { "Content-Type": "application/json" },
            },
          );

          const user = resultDatabase.data.searchUserData;

          const first_name = user.first_name;
          const last_name = user.last_name;
          const email = user.email;
          const state = user.state;
          const oab = user.oab;

          return Promise.resolve({
            id,
            access_token,
            role,
            first_name,
            last_name,
            email,
            state,
            oab,
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
        token.first_name = u.first_name;
        token.last_name = u.last_name;
        token.email = u.email;
        token.state = u.state;
        token.oab = u.oab;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token;
      session.id = token.id;
      session.first_name = token.first_name;
      session.last_name = token.last_name;
      session.email = token.email;
      session.state = token.state;
      session.oab = token.oab;
      session.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
