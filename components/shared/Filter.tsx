"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTER_SEARCH_PARAMS_KEY } from "@/constants";
import { formUrlQuery } from "@/lib/utils";
import { IFilterOptions } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  filters: IFilterOptions[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get(FILTER_SEARCH_PARAMS_KEY);

  const handleUpdateParams = useCallback(
    (value: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: FILTER_SEARCH_PARAMS_KEY,
        value,
      });
      router.push(newUrl, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400">
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
