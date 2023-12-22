import { BADGE_CRITERIA } from "@/constants";

export type ThemeName = "light" | "dark" | "system";

export interface IThemes {
  value: ThemeName;
  label: string;
  icon: string;
}

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Job {
  id?: string;
  employerName?: string;
  employerLogo?: string | undefined;
  employerWebsite?: string;
  jobEmploymentType?: string;
  jobTitle?: string;
  jobDescription?: string;
  jobApplyLink?: string;
  jobCity?: string;
  jobState?: string;
  jobCountry?: string;
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export interface IFilterOptions {
  name: string;
  value: string;
}
