import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";
import NoResult from "./NoResult";
import { PAGE_NUMBER_SEARCH_PARAMS_KEY } from "@/constants";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page:
      searchParams && searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
        ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
        : 1,
  });

  return (
    <>
      {result.questions.length === 0 ? (
        <NoResult
          title="There's no question to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      ) : (
        <>
          <p className="paragraph-semibold text-dark200_light900 px-2">
            {result.totalQuestions} question
            {result.totalQuestions === 1 ? "" : "s"} asked
          </p>
          {result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              clerkId={clerkId}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))}
        </>
      )}
      <div className="mt-10">
        <Pagination
          pageNumber={
            searchParams && searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
              : 1
          }
          isNext={result.isNextQuestions}
        />
      </div>
    </>
  );
};

export default QuestionTab;
