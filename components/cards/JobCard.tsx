import { processJobTitle } from "@/lib/utils";
import { Job } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface JobLocationProps {
  jobCountry?: string;
  jobCity?: string;
  jobState?: string;
}

const JobLocationCard = ({
  jobCountry,
  jobCity,
  jobState,
}: JobLocationProps) => {
  return (
    <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
      <Image
        src={`https://flagsapi.com/${jobCountry}/flat/64.png`}
        alt="country symbol"
        width={16}
        height={16}
        className="rounded-full"
      />

      <p className="body-medium text-dark400_light700">
        {jobCity && `${jobCity}, `}
        {jobState && `${jobState}, `}
        {jobCountry && `${jobCountry}`}
      </p>
    </div>
  );
};

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const {
    employerLogo,
    employerWebsite,
    jobEmploymentType,
    jobTitle,
    jobDescription,
    jobApplyLink,
    jobCity,
    jobState,
    jobCountry,
  } = job;

  return (
    <section className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <div className="flex w-full justify-end sm:hidden">
        <JobLocationCard
          jobCountry={jobCountry}
          jobCity={jobCity}
          jobState={jobState}
        />
      </div>

      <div className="flex items-center gap-6">
        {employerLogo ? (
          <Link
            href={employerWebsite ?? "/jobs"}
            className="background-light800_dark400 relative h-16 w-16 rounded-xl"
          >
            <Image
              src={employerLogo}
              alt="company logo"
              fill
              className="h-full w-full object-contain p-2"
            />
          </Link>
        ) : (
          <Image
            src="/assets/images/site-logo.svg"
            alt="default site logo"
            width={64}
            height={64}
            className="rounded-[10px]"
          />
        )}
      </div>

      <div className="w-full">
        <div className="flex-between flex-wrap gap-2">
          <p className="base-semibold text-dark200_light900 line-clamp-1">
            {processJobTitle(jobTitle)}
          </p>

          <div className="hidden sm:flex">
            <JobLocationCard
              jobCountry={jobCountry}
              jobCity={jobCity}
              jobState={jobState}
            />
          </div>
        </div>

        <p className="body-regular text-dark500_light700  mt-2 line-clamp-2">
          {jobDescription?.slice(0, 200)}
        </p>

        <div className="flex-between mt-8 flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/clock-2.svg"
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">{jobEmploymentType}</p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/currency-dollar-circle.svg"
                alt="dollar symbol"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">Not disclosed</p>
            </div>
          </div>

          <Link
            href={jobApplyLink ?? "/jobs"}
            target="_blank"
            className="flex items-center gap-2"
          >
            <p className="body-semibold primary-text-gradient">View job</p>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="arrow up right"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobCard;
