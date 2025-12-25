import { createContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import axios from "axios";

import Popup from "../../shared/components/popup";
import SubmitQuiz from "./submitQuiz";
import StartQuiz from "./startQuiz";
import Question from "./Question";
import Navbar from "./navbar";
import calculateRemainingTime from "../../helpers/calculateRemainingTime";
import QuizNavigation from "./quizNavigation";
import { useFetchQuiz, useUpdateServerResponse } from "./api/useQuizApi";
import AppLoader from "../../shared/components/loaders/loaders";
import { useMutation } from "@tanstack/react-query";

export const QuizContext = createContext();

export default function AttemptQuiz({ previewMode = false }) {
  const { quizId } = useParams();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState();
  const [ques, setQues] = useState();
  const [serverResponse, setServerResponse] = useState();
  const [quesNav, setQuesNav] = useState(false);

  const [response, setResponse] = useState([]);
  const [selectedQue, setSelectedQue] = useState(1);
  const [
    QuizNotAvailable,
    QuizNotFound,
    QuizNotStarted,
    QuizAlreadyStarted,
    QuizAlreadySubmitted,
  ] = [
    new Date(quiz?.startTime).getTime() > Date.now(),
    quiz?.published === 0,
    quiz?.published === 1 && serverResponse === undefined,
    quiz?.published === 1 && serverResponse,
    serverResponse?.submitted,
  ];

  const [endQuiz, setEndQuiz] = useState(false);
  const [timer, setTimer] = useState({
    time: 0,
    started: false,
  });

  const {
    isLoading,
    error,
    refetch: refetchQuiz,
  } = useFetchQuiz(
    quizId,
    user?.email,
    ({ quiz, response }) => {
      console.log(quiz);

      if (quiz) {
        const remainingTime = previewMode
          ? quiz.timeLimit
          : calculateRemainingTime(
              quiz.startTime,
              0,
              quiz.timeLimit,
              quiz.lineantTime,
              new Date(),
              false,
            );
        setTimer({ time: remainingTime });
        setQuiz(quiz);
        setQues(quiz.questions);
      }
      console.log("response is from server: ", response);
      if (response) {
        const remainingTime = calculateRemainingTime(
          quiz.startTime,
          response.createdAt,
          quiz.timeLimit,
          quiz.lineantTime,
          new Date(),
          true,
        );
        setTimer({ time: remainingTime, started: true });
        setServerResponse(response);
        setResponse(response.quizResponse);
      }
    },
    (err) => console.log(err),
  );

  const { mutate: updateServerResponse, isPending: updatingServerResponse } =
    useMutation({
      mutationFn: async ({ updated, responseId }) => {
        console.log("updating response is : ", updated);
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}response/update`,
          {
            responseId,
            updated: { ...updated },
          },
        );
      },
      onError: (err) => console.log(err),
    });

  const contextValue = useMemo(
    () => ({
      quiz,
      ques,
      selectedQue,
      setSelectedQue,
      serverResponse,
      setServerResponse,
      setResponse,
      setTimer,
      setEndQuiz,
      response,
      refetchQuiz,
      setQuesNav,
      updateServerResponse,
      updatingServerResponse,
      previewMode,
    }),
    [quiz, ques, response, selectedQue],
  );

  if (isLoading) return <AppLoader />;
  if ((QuizNotFound || error) && !previewMode)
    return <div>The quiz you are looking for is not found</div>;
  if (QuizAlreadySubmitted)
    return <div>You have already attempted this quiz</div>;

  return (
    <QuizContext.Provider value={{ ...contextValue, timer }}>
      <div className="flex bg-[#f3f3f3] flex-col gap-12 h-screen rounded-xl shadow-md">
        {(QuizNotStarted || QuizNotAvailable) && !previewMode && <StartQuiz />}

        {(QuizAlreadyStarted || previewMode) && (
          <>
            <Navbar />
            <Question />
          </>
        )}

        <AnimatePresence>
          {endQuiz && !previewMode && (
            <Popup action={() => setEndQuiz(!(timer.time > 0))}>
              <SubmitQuiz closeQuiz={() => setEndQuiz(!(timer.time > 0))} />
            </Popup>
          )}
          {quesNav && (
            <Popup
              title="Create New Workspace"
              action={() => setQuesNav(false)}
            >
              <QuizNavigation
                setQuesNav={setQuesNav}
                ques={ques}
                response={response}
              />
            </Popup>
          )}
        </AnimatePresence>
        {previewMode && (
          <h1 className="absolute flex gap-2 items-center text-sm top-5 left-1/2 border-2 border-[#e5e7eb] px-4 py-1.5 bg- rounded-full font-Satoshi-Bold bg-white -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-2.5 h-2.5 bg-red-600 rounded-full"
            ></motion.div>
            Preview Mode
          </h1>
        )}
      </div>
    </QuizContext.Provider>
  );
}
