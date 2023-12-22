import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/jobs/JobsFilter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import {
  FILTER_SEARCH_PARAMS_KEY,
  PAGE_NUMBER_SEARCH_PARAMS_KEY,
  QUERY_SEARCH_PARAMS_KEY,
} from "@/constants";
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from "@/lib/actions/job.action";
import { Job, SearchParamsProps } from "@/types";

const generateJobSearchQuery = (
  userLocation: string,
  searchParams?: { [key: string]: string | undefined }
) => {
  if (searchParams) {
    if (
      QUERY_SEARCH_PARAMS_KEY in searchParams &&
      searchParams[QUERY_SEARCH_PARAMS_KEY] &&
      FILTER_SEARCH_PARAMS_KEY in searchParams &&
      searchParams[FILTER_SEARCH_PARAMS_KEY]
    ) {
      return `${searchParams[QUERY_SEARCH_PARAMS_KEY]} in ${searchParams[FILTER_SEARCH_PARAMS_KEY]}`;
    } else if (
      QUERY_SEARCH_PARAMS_KEY in searchParams &&
      searchParams[QUERY_SEARCH_PARAMS_KEY]
    ) {
      return `${searchParams[QUERY_SEARCH_PARAMS_KEY]}`;
    } else if (
      FILTER_SEARCH_PARAMS_KEY in searchParams &&
      searchParams[FILTER_SEARCH_PARAMS_KEY]
    ) {
      return `Software Developer in ${searchParams[FILTER_SEARCH_PARAMS_KEY]}`;
    }
  }
  if (userLocation.trim().length === 0) {
    return "Software Developer";
  }
  return `Software Developer in ${userLocation}`;
};

const Jobs = async ({ searchParams }: SearchParamsProps) => {
  const userLocation = await fetchLocation();
  const jobs = await fetchJobs({
    query: generateJobSearchQuery(userLocation, searchParams),
    page: searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
      ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
      : 1,
  });
  const countries = await fetchCountries();
  console.log({ countries, jobs, userLocation });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company or Keywords"
          otherClasses="flex-1"
        />
        <JobsFilter
          filters={countries}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {jobs.length > 0 ? (
          jobs.map((job: Job) => {
            if (job.jobTitle && job.jobTitle.toLowerCase() !== "undefined") {
              return <JobCard key={job.id} job={job} />;
            }
            return null;
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={
            searchParams && searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              : 1
          }
          isNext={jobs.length === 10}
        />
      </div>
    </>
  );
};

export default Jobs;
