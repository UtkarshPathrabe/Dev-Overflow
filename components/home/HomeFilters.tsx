"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FILTER_SEARCH_PARAMS_KEY } from "@/constants";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  const handleTypeClick = useCallback(
    (item: string) => {
      if (active === item) {
        setActive("");
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: FILTER_SEARCH_PARAMS_KEY,
          value: null,
        });
        router.push(newUrl, { scroll: false });
      } else {
        setActive(item);
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: FILTER_SEARCH_PARAMS_KEY,
          value: item.toLowerCase(),
        });
        router.push(newUrl, { scroll: false });
      }
    },
    [active, router, searchParams]
  );

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          onClickCapture={() => handleTypeClick(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500 hover:bg-light-800 dark:hover:bg-dark-300"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
