import React from "react";

import * as avatar from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export function AvatarImage() {
  const { data: session }: any = useSession();

  const imagePerfil = "https://galgjur-perfil-images.s3.amazonaws.com";
  return <avatar.AvatarImage src={`${imagePerfil}/${session?.id}.png`} />;
}
