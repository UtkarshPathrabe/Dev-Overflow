import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor,
}: MetricProps) => {
  const MetricContent = useMemo(
    () => (
      <>
        <Image
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`object-contain ${href ? "rounded-full" : ""}`}
        />
        <p className={`${textStyles} flex-center gap-1`}>
          <span className="leading-3">{value}</span>
          <span
            className={`small-regular line-clamp-1 leading-3 ${
              isAuthor ? "max-sm:hidden" : ""
            }`}>
            {title}
          </span>
        </p>
      </>
    ),
    [alt, href, imgUrl, isAuthor, textStyles, title, value]
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {MetricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{MetricContent}</div>;
};

export default Metric;
