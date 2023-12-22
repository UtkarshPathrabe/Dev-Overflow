"use server";

import { Job } from "@/types";
import { formatJobApiResponse } from "../utils";
import { JobFilterParams } from "./shared.types";

export const fetchLocation = async () => {
  try {
    const response = await fetch(
      `http://api.ipapi.com/api/check?access_key=${process.env.NEXT_PUBLIC_IP_API_ACCESS_KEY}&output=json&fields=main&language=en`
    );
    const result = await response.json();
    return `${result.region_name}, ${result.country_name}` ?? "";
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const result = await response.json();
    const countriesCommonName =
      result.map((data: { name: { common: string } }) => data?.name?.common) ??
      [];
    const countryNames: string[] = countriesCommonName.filter(
      (item: null | undefined | string) => item !== null && item !== undefined
    );
    countryNames.sort();
    return countryNames;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  try {
    const { query, page } = filters;
    const headers = {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST ?? "",
    };
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
      {
        headers,
      }
    );
    const jobsData = await response.json();
    const result: Job[] = jobsData.data.map((job: any) =>
      formatJobApiResponse(job)
    );
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
