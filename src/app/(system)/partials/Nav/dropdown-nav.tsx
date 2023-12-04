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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { data } from "./data";
import Icon from "@/lib/icons";
import { AvatarImage } from "./avatar-image";

export default function Dropdown() {
  const { data: session }: any = useSession();

  const classNameIcon = "mr-2 h-4 w-4";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer select-none">
          <AvatarImage />
          <AvatarFallback className="bg-slate-300 uppercase">
            {session?.first_name.charAt(0)}
            {session?.last_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <DropdownMenuItem className="p-0">
            <span className="capitalize">
              {session?.first_name} {session?.last_name}
            </span>
          </DropdownMenuItem>
          <p className="text-[0.75rem] uppercase opacity-50">
            OAB {session?.oab} {session?.state}
          </p>
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
