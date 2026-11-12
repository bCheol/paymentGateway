import {
  SidebarMenu,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useLocation } from "react-router";
import { navItems } from "./data";
import AppSidebarHeader from "./sidebar-header";
import SidebarMenuItem from "./sidebar-menu-item";
import SidebarWidget from "./sidebar-widget";

export default function AppSidebar() {
  const { open, isMobile, isHovered } = useSidebar();
  const { pathname } = useLocation();

  const showContent = open || isHovered || isMobile;
  const [prevPathname, setPrevPathname] = useState(pathname);
  
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
  }

  return (
    <Sidebar side="left" collapsible="icon">
      <AppSidebarHeader showContent={showContent} />

      <SidebarContent className="overflow-y-auto px-5 duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <SidebarMenu className="gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem
                  key={item.key}
                  nav={item}
                  showContent={showContent}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </div>
        </nav>
      </SidebarContent>

      {/* {showContent && (
        <SidebarFooter className="p-0 px-5 pt-1 pb-4">
          <SidebarWidget />
        </SidebarFooter>
      )} */}
    </Sidebar>
  );
}