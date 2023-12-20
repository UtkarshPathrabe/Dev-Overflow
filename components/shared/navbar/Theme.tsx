"use client";

import { THEME_STORAGE_KEY, themes } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";
import { ThemeName } from "@/types";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@radix-ui/react-menubar";
import Image from "next/image";
import { MouseEvent, useCallback } from "react";

const Theme = () => {
  const { mode, setMode } = useTheme();

  const updateMode = useCallback(
    (value: ThemeName) => (event: MouseEvent) => {
      event.preventDefault();
      setMode(value);
      if (value !== "system") {
        localStorage.setItem(THEME_STORAGE_KEY, value);
      } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    },
    [setMode]
  );

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              onClick={updateMode(item.value)}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2 hover:bg-light-800 dark:hover:bg-dark-400"
            >
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                className={`${mode === item.value ? "active-theme" : ""}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
