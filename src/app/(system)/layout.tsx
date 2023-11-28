import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "./partials/nav";
import { NextAuthProvider } from "@/providers/sessionProvider";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galgjur",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <html lang="pt-br">
      <body className={`flex h-screen flex-col ${inter.className}`}>
        <NextAuthProvider>
          <Nav />
          <main className="flex flex-grow items-center justify-center">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
