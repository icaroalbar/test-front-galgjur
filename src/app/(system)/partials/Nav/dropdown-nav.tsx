"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { data } from "./data";
import Icon from "@/lib/icons";

export default function Dropdown() {
  const { data: session }: any = useSession();

  const classNameIcon = "mr-2 h-4 w-4";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer select-none">
          <AvatarImage
            src={`https://galgjur-perfil-images.s3.amazonaws.com/${session?.id}.png`}
          />
          <AvatarFallback className="bg-slate-300">IA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <span>Icaro Albar</span>
          <p className="text-[0.75rem] uppercase opacity-50">OAB 123456</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-300" />
        <DropdownMenuGroup>
          {Object.entries(data).map(([groupName, groupItems], index) => (
            <React.Fragment key={index}>
              {groupItems.map((item, itemIndex) => (
                <Link href={item.href} key={itemIndex}>
                  <DropdownMenuItem
                    key={itemIndex}
                    className="flex cursor-pointer items-center capitalize transition-colors hover:bg-slate-200"
                  >
                    <Icon name={item.icon} className={classNameIcon} />
                    {item.text}
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator className="bg-slate-300" />
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuItem
          className="cursor-pointer transition-colors hover:bg-slate-200"
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
        >
          <Icon name="LogOut" className={classNameIcon} />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
