import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Dropdown from "./dropdown-nav";
import { Button } from "@/components/ui/button";
import { data } from "./data";
import Icon from "@/lib/icons";

export default async function Nav() {
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
              <Icon name="BarChartBig" />
            </Link>
          </Button>
          <h2 className="text-lg font-semibold">Galgjur</h2>
        </div>
        <div className="flex items-center gap-x-8">
          <ul className="flex gap-x-2">
            {data.groupB.map((item, index) => (
              <Button
                key={index}
                asChild
                size="icon"
                variant={"outline"}
                className="flex items-center justify-center border-2 hover:bg-slate-200"
              >
                <Link href={`/${item.href}`}>
                  <Icon name={item.icon} />
                </Link>
              </Button>
            ))}
          </ul>
          <Dropdown />
        </div>
      </div>
      <Separator className="bg-slate-400" />
    </nav>
  );
}
