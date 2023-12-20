import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import {
  PAGE_NUMBER_SEARCH_PARAMS_KEY,
  QUERY_SEARCH_PARAMS_KEY,
} from "@/constants";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: URLProps): Promise<Metadata> {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    pageSize: 1,
  });
  return {
    title: `Questions with Tag '${result.tagTitle}' | Dev Overflow`,
    description: `View questions with tag '${result.tagTitle}' on Dev Overflow - A community-driven platform for asking and answering programming questions. Get help, share knowledge and collaborate with developers from around the world. Explore topics in web developments, mobile app development, algorithms, data structures and more...`,
  };
}

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page:
      searchParams && searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
        ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
        : 1,
    searchQuery: searchParams[QUERY_SEARCH_PARAMS_KEY],
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no tag question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={
            searchParams && searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              : 1
          }
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
