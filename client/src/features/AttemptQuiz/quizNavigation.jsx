import React, { useContext, useEffect, useState } from "react";
import {
  CheckSquare,
  Info,
  MinusSquare,
  Question,
  QuestionMark,
  Square,
  SquareLogo,
  X,
  XSquare,
} from "@phosphor-icons/react";
import { QuizContext } from ".";

const QuestionButton = ({ que, number }) => {
  const { selectedQue, setSelectedQue } = useContext(QuizContext);

  return (
    <div
      onClick={() => setSelectedQue(number)}
      className={`${number == selectedQue && "!bg-[#4e41e7] !border-[#4e41e7] !text-white"} ${que?.correct.length === 0 && "border-2"} ${que?.correct.length > 0 && "bg-cyan-200 text-cyan-900 border-cyan-200"} ${que?.notsure && "bg-cyan-200 text-cyan-900 border-cyan-200"} cursor-pointer border-2 font-Satoshi-Medium relative rounded-full  w-10 h-10 text-sm flex items-center justify-center`}
    >
      {number}
      {number == selectedQue && (
        <span className="bg-white p-[1.5px] absolute rounded-full top-2 right-2.5"></span>
      )}
      {que?.notsure ? (
        <span className="absolute -top-0.5 -right-0.5 bg-orange-400 rounded-full p-[2.5px] text-black border-2 border-white">
          <QuestionMark size={8} weight="bold" />
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default function QuizNavigation({ ques, response, setQuesNav }) {
  const [questions, setQuestions] = useState(ques);
  const [selectedBar, setSelectedBar] = useState(1);

  useEffect(() => {
    switch (selectedBar) {
      case 1:
        //show all questions
        setQuestions(ques);
        break;
      case 2:
        //show answered questions
        setQuestions(
          ques.filter((ele) => {
            const queRes =
              response.find((res) => res.queId == ele._id) || undefined;
            return queRes && queRes.correct.length > 0;
          }),
        );
        break;
      case 3:
        //show not answered questions
        setQuestions(
          ques.filter((ele) => {
            const queRes = response.find((res) => res.queId === ele._id);
            // Include if either no response exists OR response exists but correct array is empty
            return !queRes || queRes.correct.length === 0;
          }),
        );
        break;
      case 4:
        //show not sure ones
        setQuestions(
          ques.filter((ele) => {
            const queRes = response.find((res) => res.queId === ele._id);

            return queRes && queRes.notsure === 1;
          }),
        );
        break;
      default:
        setQuestions(ques);
    }
  }, [selectedBar, setSelectedBar]);

  return (
    <div className="w-[580px] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl bg-white border-[1.2px] p-3.5 pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0 ">
          <h2 className="font-Satoshi-Bold text-md">Quiz Navigation</h2>
          <div className="h-4 border-l-2 border-[#e6e6e6] hidden md:block"></div>
          <span className="font-Satoshi-Bold text-gray-600 text-[12.5px]">
            {ques.length} Questions
          </span>
        </div>

        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setQuesNav(false)}
        >
          <X size={16} weight="bold" />
        </button>
      </div>

      {/* separator */}
      <div className="w-full border-t-[2px] border-[#e6e6e6] mb-4"></div>

      {/* lower div */}
      <div className="flex flex-col md:flex-row items-start justify-between w-full">
        <div className="w-full md:w-[40%] mb-6 md:mb-0">
          <h3 className="font-Satoshi-Bold mb-2 text-gray-600 text-xs">
            Show question
          </h3>

          <div
            onClick={() => setSelectedBar(1)}
            className={`${selectedBar == 1 && "!bg-[#f2f1fd] !border-[#aea2e7] !text-black"} cursor-pointer flex items-center text-gray-500 justify-between mt-2 bg-white border-2 border-gray-200 rounded-md px-2.5 py-2 `}
          >
            <div className="flex items-center space-x-2">
              <SquareLogo size={16} />
              <span className=" text-sm font-Satoshi-Bold">All Questions</span>
            </div>
            <p className="bg-gray-300 text-gray-700 rounded-md w-6 h-5 flex items-center justify-center font-Satoshi-Medium text-xs">
              {ques.length}
            </p>
          </div>

          <div
            onClick={() => setSelectedBar(2)}
            className={`${selectedBar == 2 && "!bg-[#f2f1fd] !border-[#aea2e7] !text-black"} text-gray-500 cursor-pointer flex items-center justify-between mt-2 bg-white border-2 border-gray-200 rounded-md px-2.5 py-2 `}
          >
            <div className="flex items-center space-x-2">
              <CheckSquare size={16} />
              <span className="text-sm font-Satoshi-Bold">Answered</span>
            </div>
            <p className="bg-gray-300 text-gray-700 rounded-md w-6 h-5 flex items-center justify-center font-Satoshi-Medium text-xs">
              {response.filter((ele) => ele.correct.length > 0).length}
            </p>
          </div>

          <div
            onClick={() => setSelectedBar(3)}
            className={`${selectedBar == 3 && "!bg-[#f2f1fd] !border-[#aea2e7] !text-black"} text-gray-500 cursor-pointer flex items-center justify-between mt-2 bg-white border-2 border-gray-200 rounded-md px-2.5 py-2 `}
          >
            <div className="flex items-center space-x-2">
              <XSquare size={16} />
              <span className="text-sm font-Satoshi-Bold">Not Answered</span>
            </div>
            <p className="bg-gray-300 text-gray-700 rounded-md w-6 h-5 flex items-center justify-center font-Satoshi-Medium text-xs">
              {ques.length -
                response.filter((ele) => ele.correct.length > 0).length}
            </p>
          </div>

          <div
            onClick={() => setSelectedBar(4)}
            className={`${selectedBar == 4 && "!bg-[#f2f1fd] !border-[#aea2e7] !text-black"} text-gray-500 cursor-pointer flex items-center justify-between mt-2 bg-white border-2 border-gray-200 rounded-md px-2.5 py-2 `}
          >
            <div className="flex items-center space-x-2">
              <MinusSquare size={16} />
              <span className="text-sm font-Satoshi-Bold">Not Sure</span>
            </div>
            <p className="bg-gray-300 text-gray-700 rounded-md w-6 h-5 flex items-center justify-center font-Satoshi-Medium text-xs">
              {response.filter((ele) => ele.notsure === 1).length}
            </p>
          </div>

          <div className="flex items-start space-x-2 mt-4 text-xs text-gray-600">
            <Info size={26} weight="bold" />
            <p className="font-Satoshi-Bold mb-2 text-gray-600 text-xs">
              Choose tab finds questions that need a list of numbers as answers.
            </p>
          </div>
        </div>

        <div className="border-t md:border-l-2 border-[#e6e6e6] self-stretch my-4 md:my-0 md:mx-4 w-full md:w-0"></div>

        <div className="lower-right-section w-full md:w-[48%]">
          <h3 className="font-Satoshi-Bold mb-2 text-gray-600 text-xs">
            List Number Question
          </h3>
          <div className="mcq-number-section grid grid-cols-5 gap-3">
            {questions.map((que, i) => (
              <QuestionButton
                key={i}
                que={response.find((ele) => ele.queId == que._id)}
                number={ques.findIndex((ele) => ele._id == que._id) + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
