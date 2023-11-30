type MenuItem = {
  icon: string | any;
  href: string;
  text: string;
};

type MenuGroup = {
  [key: string]: MenuItem[];
};

type MenuData = {
  groupA: MenuGroup["groupA"];
  groupB: MenuGroup["groupB"];
  groupC: MenuGroup["groupC"];
};

export const data: MenuData = {
  groupA: [
    {
      icon: "User",
      href: "perfil",
      text: "perfil",
    },
    {
      icon: "BarChartBig",
      href: "dashboard",
      text: "dashboard",
    },
  ],
  groupB: [
    {
      icon: "CalendarDays",
      href: "calendar",
      text: "calendário",
    },
    {
      icon: "Gavel",
      href: "processes",
      text: "processos",
    },
    {
      icon: "BookUser",
      href: "clients",
      text: "clientes",
    },
    {
      icon: "Landmark",
      href: "financial",
      text: "financeiro",
    },
    {
      icon: "BookOpenText",
      href: "publications",
      text: "publicações",
    },
  ],
  groupC: [
    {
      icon: "Settings",
      href: "settings",
      text: "configurações",
    },
    {
      icon: "LifeBuoy",
      href: "support",
      text: "supporte",
    },
  ],
};
