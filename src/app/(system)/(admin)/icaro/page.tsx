"use client";

import { defineAbility } from "@/lib/ability";
import { Can } from "@casl/react";
import { useSession } from "next-auth/react";

export default function Icaro() {
  const { data: session }: any = useSession();
  const user = { role: session?.role } as const;
  const ability = defineAbility(user);

  return (
    <div className="flex flex-col gap-y-5">
      <h3 className="scroll-m-20 text-2xl font-semibold capitalize tracking-tight">
        icaro
      </h3>
      <Can I="manage" a="all" ability={ability}>
        <button>{session?.role}</button>
      </Can>
    </div>
  );
}
