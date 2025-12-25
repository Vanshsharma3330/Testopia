import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from ".";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import startbg from "../../assets/img/QuizStart.svg";
import parseDateWithTime, {
  parseDate,
  parseTimeFromDate,
} from "../../helpers/parseDate";
import FormatTime from "../../helpers/formatTime";
import bgplaceholder from "../../assets/img/bgplaceholder.png";
import {
  ArrowRight,
  CalendarDots,
  ChatText,
  Clock,
  Star,
} from "@phosphor-icons/react";

export default function StartQuiz() {
  const { setServerResponse, setResponse, quiz, timer, refetchQuiz } =
    useContext(QuizContext);
  const { user } = useAuth();
  const { quizId } = useParams();
  const [isQuizAvailable, setIsQuizAvailable] = useState(false);
  const [QuizAlreadyEnded] = [timer.time == -1];
  const quizEndTime = new Date(
    new Date(quiz.startTime).getTime() + quiz.timeLimit * 1000,
  );

  useEffect(() => {
    const checkQuizAvailability = () => {
      if (new Date(quiz?.startTime).getTime() <= Date.now()) {
        setIsQuizAvailable(true);
      } else {
        setIsQuizAvailable(false);
      }
    };
    checkQuizAvailability();

    const intervalId = setInterval(checkQuizAvailability, 1000);

    return () => clearInterval(intervalId);
  }, [quiz?.startTime]);

  const { mutate: createResponse, isPending: createResponsePending } =
    useMutation({
      mutationFn: async () => {
        const res = await axios.post("http://localhost:5000/response/create", {
          userId: user?.email,
          quizId: quizId,
        });
        setServerResponse(res.data.response);
        setResponse(res.data.response.quizResponse);
        refetchQuiz();
      },
      onSuccess: (data) => {
        if (data.success) {
          console.log(data.success);
        }
        if (data.error) {
          console.log(data.error);
        }
      },
      onError: (data) => {
        console.log(data);
      },
    });

  const handleStartQuiz = () => {
    createResponse();
  };

  return (
    <>
      <div className="w-full h-screen flex bg-[#f3f3f3] object-contain overflow-hidden">
        <div className="w-1/2 h-full flex flex-col object-contain overflow-hidden">
          <img
            src={startbg}
            alt=""
            className="h-full object-cover object-[-65px,55px]"
          />
        </div>

        <div className="w-1/2 h-full p-20">
          <div className="h-full w-full p-10 rounded-lg flex items-center justify-between flex-col bg-white">
            <div className="w-full">
              <div className="w-full h-[140px] rounded-t-xl overflow-hidden  bg-black">
                <img
                  src={`http://localhost:5000/uploads/${quiz.creator}/${quiz.workspace}/${quiz.quizThumbnail}`}
                  className="w-full h-full object-cover"
                  alt="Quiz thumbnail"
                  onError={(e) => {
                    // Fallback to placeholder when image is missing
                    e.currentTarget.src = bgplaceholder;
                  }}
                />
              </div>
              <div className="text-center mt-5">
                <h1 className="text-4xl/tight font-Satoshi-Bold">
                  {quiz.title}
                </h1>
                <p className="text-sm font-Satoshi-Medium text-gray-700">
                  {quiz.desc}
                </p>
              </div>
            </div>

            <div className="font-Satoshi-Bold flex justify-between  mt-5 mb-5 px-5 rounded-lg py-4 w-full">
              <div className="flex gap-3.5 items-center">
                <div className="p-1 border-2 h-fit bg-white rounded-md">
                  <Clock size={24} weight="fill" />
                </div>
                <div>
                  <p className="text-[13px]/tight text-gray-600">
                    Time allowed
                  </p>
                  <p className="text-md/normal font-bold">
                    {quiz.timeLimit / 60} mins
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5 items-center">
                <div className="p-1 border-2 bg-white h-fit rounded-md">
                  <ChatText size={24} weight="fill" />
                </div>
                <div>
                  <p className="text-[13px]/tight text-gray-600">
                    No. of Questions
                  </p>
                  <p className="text-md/normal font-bold">
                    {quiz.questions.length}
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5 items-center">
                <div className="p-1 border-2 bg-white h-fit rounded-md">
                  <Star size={24} weight="fill" />
                </div>
                <div>
                  <p className="text-[13px]/tight text-gray-600">Total Marks</p>
                  <p className="text-md/normal font-bold">
                    {quiz.questions.reduce(
                      (total, question) => total + (question.points || 0),
                      0,
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* determine if quiz is available or not */}
            {isQuizAvailable && !QuizAlreadyEnded ? (
              <button
                className="w-full p-1.5  mt-10 border rounded-md bg-[#4e41e6] text-white"
                onClick={handleStartQuiz}
              >
                {createResponsePending ? "Loading" : "Start Quiz"}
              </button>
            ) : QuizAlreadyEnded ? (
              <div>Quiz Already Ended</div>
            ) : (
              <div className="flex flex-col items-center gap-2 font-Satoshi-Bold border-t-2 w-full pt-5">
                <p className="flex items-center text-[12px] bg-[#f3f3f3] p-1  text-gray-600 gap-1 rounded-xl">
                  <CalendarDots size={16} />
                  {parseDate(quiz?.startTime)}
                </p>
                <p className="flex gap-6 text-lg items-center">
                  <span>{parseTimeFromDate(quiz?.startTime)}</span>
                  <ArrowRight size={17} color="#4b5563" weight="bold" />
                  <span>{parseTimeFromDate(quizEndTime)}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
