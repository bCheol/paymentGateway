export interface NavItem {
  key: string;
  path: string;
}

export const navItems: NavItem[] = [
  {
    key: "home",
    path: "/",
  },
  // {
  //   key: "signup",
  //   path: "/signup",
  // },
  {
    key: "signin",
    path: "/signin",
  },
];