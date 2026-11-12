import ThemeToggleButton from "@/components/shared/header/theme-toggler";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/i18n";
import { HorizontalDotsIcon, MenuTwoIcon, XIcon } from "@/icons";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import { useUserStateStore } from '@/lib/useUserStateStore';

export default function AppHeader() {
  const t = useTranslations("header");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { openMobile, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const userStateCheck = useUserStateStore((state) => state.check);
  const userNickName = useUserStateStore((state) => state.nickName);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const logout = () => {
    axios.post('/api/logout')
    .then((response) => {
      const res = response.data;
      if (res.result) {
        localStorage.removeItem('accessToken');
        useUserStateStore.getState().deleteInfo();
        navigate("/");
      }
    })
    .catch((error) => {
      //console.log(error);
    });
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 flex w-full shrink-0 border-gray-200 bg-white xl:border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:px-6">
        {/* Left side content */}
        <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0 xl:py-4 dark:border-gray-800">
          <Button
            variant="outline"
            size="icon"
            className="text-gray-500 lg:size-11 dark:text-gray-400"
            onClick={toggleSidebar}
            aria-label={t("toggleSidebar")}
          >
            {openMobile ? (
              <XIcon className="size-6" />
            ) : (
              <MenuTwoIcon className="size-auto! rtl:-scale-x-100" />
            )}
          </Button>

          <Link to="/" className="xl:hidden">
            <img
              className="h-8 w-38.5 dark:hidden"
              src="/images/logo/logo.svg"
              alt="Logo"
            />
            <img
              className="hidden h-8 w-38.5 dark:block"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>

          {userNickName ? <Label> {userNickName} 님 </Label> : null}
          {userStateCheck ?
            <Button onClick={() => logout()}>
              로그아웃
            </Button>
            : null
          }

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleApplicationMenu}
            aria-label="Toggle application menu"
            className="text-gray-700 xl:hidden dark:text-gray-400"
          >
            <HorizontalDotsIcon />
          </Button>
        </div>

        {/* Right side content */}
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md xl:flex xl:justify-end xl:px-0 xl:shadow-none",
            isApplicationMenuOpen ? "flex" : "hidden",
          )}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}