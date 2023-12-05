import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type UserSession = {
  role: string;
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as UserSession;
  const role = session?.role;

  if (session && role != "root") {
    redirect("/notFound");
  }

  return <>{children}</>;
}
