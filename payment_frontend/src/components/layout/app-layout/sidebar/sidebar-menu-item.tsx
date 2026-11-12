import { SidebarMenuItem as UiSidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { Link } from "react-router";
import type { NavItem } from "./data";

interface SidebarMenuItemProps {
  nav: NavItem;
  showContent: boolean;
  pathname: string;
}

export default function SidebarMenuItem({
  nav,
  showContent,
  pathname,
}: SidebarMenuItemProps) {

  const isItemActive = Boolean(nav.path && nav.path === pathname);

  return (
    <UiSidebarMenuItem>
      <Link
        to={nav.path}
        className=
        {cn(
          "group menu-item",
          isItemActive ? "menu-item-active" : "menu-item-inactive",
        )}
      >
        {showContent && (
          <span className="menu-item-text">{nav.key}</span>
        )}
      </Link>
    </UiSidebarMenuItem>
  );
}