import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";
import NoResult from "./NoResult";
import { PAGE_NUMBER_SEARCH_PARAMS_KEY } from "@/constants";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page:
      searchParams && searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
        ? +searchParams[PAGE_NUMBER_SEARCH_PARAMS_KEY]
        : 1,
  });

  return (
    <>
      {result.answers.length === 0 ? (
        <NoResult
          title="There's no answer to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      ) : (
        <>
          <p className="paragraph-semibold text-dark200_light900 px-2">
            {result.totalAnswers} answer{result.totalAnswers === 1 ? "" : "s"}
          </p>
          {result.answers.map((item) => (
            <AnswerCard
              key={item._id}
              clerkId={clerkId}
              _id={item._id}
              question={item.question}
              author={item.author}
              upvotes={item.upvotes.length}
              createdAt={item.createdAt}
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
          isNext={result.isNextAnswer}
        />
      </div>
    </>
  );
};

export default AnswersTab;
