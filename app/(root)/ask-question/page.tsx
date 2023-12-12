import Question from "@/components/forms/Question";

const AskQuestion = () => {
  return (
    <div className="flex flex-col">
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId="" />
      </div>
    </div>
  );
};

export default AskQuestion;
