"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-y-5">
      <h3 className="scroll-m-20 text-2xl font-semibold capitalize tracking-tight">
        página não encontrada
      </h3>
      <Button asChild size="sm">
        <Link href={`/`} className="uppercase">
          página inicial
        </Link>
      </Button>
    </div>
  );
}
