import { Separator } from "@/components/ui/separator";
import {
  BarChartBig,
  BookUser,
  CalendarDays,
  Landmark,
  BookOpenText,
  Gavel,
} from "lucide-react";
import Link from "next/link";
import Dropdown from "./dropdown-nav";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type menuProps = {
  label: ReactNode;
  href: string;
};

const data: menuProps[] = [
  {
    label: <CalendarDays />,
    href: "calendar",
  },
  {
    label: <Gavel />,
    href: "processes",
  },
  {
    label: <BookUser />,
    href: "clients",
  },
  {
    label: <Landmark />,
    href: "financial",
  },
  {
    label: <BookOpenText />,
    href: "publications",
  },
];

export default function Nav() {
  return (
    <nav>
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-x-2">
          <Button
            asChild
            size="icon"
            variant={"outline"}
            className="border-2 hover:bg-slate-200"
          >
            <Link href={`/dashboard`}>
              <BarChartBig />
            </Link>
          </Button>
          <h2 className="text-lg font-semibold">Galgjur</h2>
        </div>
        <div className="flex items-center gap-x-8">
          <ul className="flex gap-x-2">
            {data.map((item, index) => (
              <Button
                key={index}
                asChild
                size="icon"
                variant={"outline"}
                className="border-2 hover:bg-slate-200"
              >
                <Link href={`/${item.href}`}>{item.label}</Link>
              </Button>
            ))}
          </ul>
          <Dropdown />
        </div>
      </div>
      <Separator className="bg-slate-400" />
      {/* <div className="bg-slate-300 py-1 shadow-lg">
        <div className="container flex items-center justify-between">
          <Button
            asChild
            size="icon"
            variant={"ghost"}
            className="hover:bg-transparent/5"
          >
            <Link href="/dashboard">
              <BarChartBig />
            </Link>
          </Button>
          <ul className="flex text-sm">
            {data.map((item, index) => (
              <Button
                key={index}
                asChild
                size={"sm"}
                variant={"ghost"}
                className="font-light capitalize hover:bg-transparent/5"
                suppressHydrationWarning
              >
                <Link href={`/${item.href}`}>{item.label}</Link>
              </Button>
            ))}
          </ul>
        </div>
      </div> */}
    </nav>
  );
}
