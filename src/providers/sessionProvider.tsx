"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type SessionProps = {
  children: ReactNode;
};

export const NextAuthProvider = ({ children }: SessionProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
