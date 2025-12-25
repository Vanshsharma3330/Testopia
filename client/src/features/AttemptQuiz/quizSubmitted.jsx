import { CheckCircle } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormatTime from "../../helpers/formatTime";
import { AnimatePresence } from "framer-motion";
import UserQuizDetails from "../../shared/components/userQuizDetails";
import Popup from "../../shared/components/popup";

export default function QuizSubmitted() {
  const { quizId, responseId } = useParams();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const {
    data: result,
    isLoading,
    error,
    refetch: refetchResult,
  } = useQuery({
    queryKey: ["result", quizId, responseId],
    queryFn: async () => {
      try {
        const serverResponse = await axios.post(
          "http://localhost:5000/response/singleresult",
          {
            quizId: quizId,
            responseId: responseId,
          },
        );

        return serverResponse.data.result;
      } catch (err) {
        console.log("error finding result ", err);
      }
    },
    enabled: !!quizId && !!responseId,
    onError: (err) => {
      console.log(err);
    },
    refetchOnWindowFocus: true,
  });

  if (!result && !isLoading) {
    return (
      <div className="pt-20 bg-[#f3f3f3] h-screen w-screen font-Satoshi-Medium flex flex-col items-center gap-4">
        <p className="text-lg font-Satoshi-Bold">Unable to load results.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#5a4bea] text-white font-Satoshi-Bold p-2.5 px-4 text-base rounded-md"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#f3f3f3] h-screen w-screen font-Satoshi-Medium">
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <div className="flex flex-col items-center">
            <CheckCircle size={96} color="#12ae7c" weight="fill" />
            <h1 className="font-Satoshi-Black text-2xl">
              Congratulation! You completed this quiz!
            </h1>
            <p className="text-md">
              You finished the quiz click on Show details to see how you
              performed.
            </p>
          </div>
          <p className="mt-20 font-Satoshi-Bold text-center">
            You successfully completed this quiz with{" "}
            {result.grades.correctQuestions} correct questions out of{" "}
            {result.grades.totalQuestions}
          </p>
          <div className="flex items-center justify-center mt-5">
            <div className="bg-white p-6 border-r-2 rounded-xl shadow-lg">
              <p className="text-[#7f7f7f] font-Satoshi-Bold text-sm/tight">
                Total Score
              </p>
              <p className="text-[#7f7f7f] text-sm/tight">
                <span className="font-Satoshi-Black text-black text-xl pr-1">
                  {result.grades.earnedPoints}
                </span>{" "}
                Points
              </p>
            </div>
            <div className="bg-white p-6 border-r-2 rounded-xl shadow-lg">
              <p className="text-[#7f7f7f] font-Satoshi-Bold text-sm/tight">
                Accuracy
              </p>
              <p className="text-[#7f7f7f] text-sm/tight">
                <span className="font-Satoshi-Black text-black text-xl pr-1">
                  {result.grades.percentage}
                </span>{" "}
                %
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-[#7f7f7f] font-Satoshi-Bold text-sm/tight">
                Time Spent
              </p>
              <p className="text-[#7f7f7f] text-sm/tight">
                <span className="font-Satoshi-Black text-black text-xl pr-1">
                  {FormatTime(result.timeSpent)}
                </span>
              </p>
            </div>
          </div>
          <div className="w-fit flex gap-5 mt-10 mx-auto">
            <button
              onClick={() => setShowResults(!showResults)}
              className="border-2 text-black bg-white font-Satoshi-Bold p-2.5 pr-3 pl-3 text-base rounded-md"
            >
              Show Details
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#5a4bea] text-white font-Satoshi-Bold p-2.5 px-4 text-base rounded-md"
            >
              Finish
            </button>
          </div>
          <AnimatePresence>
            {showResults && (
              <Popup action={() => setShowResults(false)}>
                <UserQuizDetails
                  result={result}
                  setShowResults={setShowResults}
                />
              </Popup>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
