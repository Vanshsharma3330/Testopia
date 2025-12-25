import {
  Check,
  Minus,
  QuestionMark,
  SealQuestion,
  Star,
  X,
} from "@phosphor-icons/react";
import React from "react";
import parseDateWithTime from "../../helpers/parseDate";
import RenderQueType from "./renderQueType";

const QuestionBox = ({ number, response }) => {
  return (
    <div className="relative w-14 h-8 bg-[#f3f3f3] font-Satoshi-Bold flex items-center justify-center rounded-sm text-sm">
      {number}
      {response.correct ? (
        <div className="bg-[#26a67e] w-4 h-4 absolute top-0 right-0 rounded-tr-sm flex justify-center items-center rounded-bl-sm">
          <Check size={10} weight="bold" color="#fff" />
        </div>
      ) : (
        <div className="bg-[#b94443] w-4 h-4 absolute top-0 right-0 rounded-tr-sm flex justify-center items-center rounded-bl-sm">
          <X size={10} weight="bold" color="#fff" />
        </div>
      )}
    </div>
  );
};

const RenderCorrect = ({ type, expectedAns, userAns }) => {
  switch (type) {
    case 2:
      return (
        <div className="gap-4 flex flex-col">
          {expectedAns.map((ans, i) => {
            return (
              <div className="font-Satoshi-Medium h-7 flex gap-1 items-center text-gray-700 bg-[#f2f2f3] px-4 p-1 rounded-full text-md">
                {userAns[i].text == ans.text ? (
                  <>
                    <div className="w-4 h-4">
                      <Check size={16} weight="bold" color="#26a67e" />
                    </div>

                    <p>{userAns[i].text}</p>
                  </>
                ) : (
                  <div className="flex gap-4">
                    <div className=" h-4 flex items-center">
                      <X size={16} weight="bold" color="#b94443" />
                      {userAns[i].text}
                    </div>

                    <div className="h-4 flex items-center">
                      <Check size={16} weight="bold" color="#26a67e" />
                      {ans.text}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    case 3:
      return (
        <>
          <button
            className={`${expectedAns.includes("1") && "!bg-[#26a67e] !text-white !border-[#26a67e]"} font-Satoshi-Medium flex gap-1 items-center text-gray-900 bg-[#f2f2f3] w-fit px-4 p-1 rounded-full text-sm`}
          >
            True
          </button>
          <button
            className={`${expectedAns.includes("2") && "bg-[#26a67e] !text-white !border-[#26a67e]"} font-Satoshi-Medium flex gap-1 items-center text-gray-900 bg-[#f2f2f3] w-fit px-4 p-1 rounded-full text-sm`}
          >
            False
          </button>
        </>
      );
    case 4:
      return (
        <div className="flex flex-col gap-3">
          {expectedAns.map((ans, i) => {
            return (
              <div key={i} className="flex gap-5">
                <div className="font-Satoshi-Medium justify-center w-10 h-7 flex gap-1 items-center text-gray-700 bg-[#f2f2f3] px-4 p-1 rounded-full text-md">
                  {ans.field}
                </div>
                <div className="font-Satoshi-Medium justify-center w-10 h-7 flex gap-1 items-center text-gray-700 bg-[#f2f2f3] px-4 p-1 rounded-full text-md">
                  {userAns[i].match == ans.match ? (
                    <>
                      <div className="w-4 h-4">
                        <Check size={16} weight="bold" color="#26a67e" />
                      </div>

                      <p>{userAns[i].match}</p>
                    </>
                  ) : (
                    <>
                      <p>
                        <div className="w-4 h-4">
                          <Check size={16} weight="bold" color="#26a67e" />
                        </div>{" "}
                        {userAns[i].match}{" "}
                      </p>
                      <p>
                        <div className="w-4 h-4">
                          <X size={16} weight="bold" color="#26a67e" />
                        </div>{" "}
                        {ans.match}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    default:
      return <>none</>;
  }
};

const UserQuizDetails = ({ result, setShowResults }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="main-user-wrapper flex justify-start no-scrollbar bg-white flex-col w-[620px] h-[500px] overflow-auto border-2  rounded-2xl">
        <div className="flex items-center justify-between sticky p-4 z-50 top-0 bg-white w-full">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 font-Satoshi-Medium bg-blue-600 text-white flex items-center justify-center rounded-full">
              {result.firstname.charAt(0)}
            </div>
            <div className="flex flex-col">
              <p className="font-Satoshi-Bold text-md">
                {result.firstname} {result.lastname}
              </p>
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-3 cursor-pointer"
            onClick={() => setShowResults(false)}
          >
            <X size={16} weight="bold" />
          </div>
        </div>
        <div className="w-full bg-[#e3e0e0] h-0.5"></div>
        <div className="p-4 px-7">
          <div className="flex items-center justify-between">
            <p className="font-Satoshi-Bold text-xl leading-tight">
              {result.title}
            </p>
            <div className="flex items-center justify-center font-Satoshi-Bold text-[#807f7f] gap-7">
              <div className="flex flex-col text-sm items-start justify-center">
                <p>Accuracy</p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-black">{result.grades.percentage}%</p>
                </div>
              </div>
              <div className="flex flex-col text-sm items-start justify-center">
                <p>Point</p>
                <div className="flex items-center justify-center gap-1">
                  <div className="h-4 w-4 flex justify-center items-center rounded-full bg-yellow-500">
                    <Star size={10} weight="fill" color="#000" />
                  </div>
                  <p className="text-black">{result.grades.earnedPoints}</p>
                </div>
              </div>
              <div className="flex flex-col text-sm items-start justify-center">
                <p>Answered</p>
                <p className="text-black">
                  {result.grades.correctQuestions +
                    result.grades.incorrectQuestions}
                  /
                  <span className="text-[#807f7f]">
                    {result.grades.totalQuestions}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 mt-5 text-[13px]">
            <p className="font-Satoshi-Medium text-[#807f7f]">
              Finished {parseDateWithTime(result.finishTime)}
            </p>
            <div className="flex items-center justify-center gap-1">
              <SealQuestion size={16} />
              <p className="text-black font-Satoshi-Bold">
                {result.grades.totalQuestions} Questions
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-1.5 mt-8">
            {result.queResponses.map((response, i) => (
              <QuestionBox key={i} number={i + 1} response={response} />
            ))}
          </div>

          <div className="flex items-center justify-start gap-10 mt-6">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-[#26a67e] w-4 h-4 rounded-tr-sm flex justify-center items-center rounded-bl-sm">
                <Check size={10} weight="bold" color="#fff" />
              </div>
              <p className="font-Satoshi-Medium text-sm text-[#807f7f]">
                Correct {result.grades.correctQuestions}{" "}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="bg-[#b94443] w-4 h-4 rounded-tr-sm flex justify-center items-center rounded-bl-sm">
                <X size={10} weight="bold" color="#fff" />
              </div>
              <p className="font-Satoshi-Medium text-sm text-[#807f7f]">
                Incorrect {result.grades.incorrectQuestions}{" "}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center rounded-sm bg-[#807f7f]">
                <Minus size={10} weight="bold" color="#fff" />
              </div>
              <p className="font-Satoshi-Medium text-sm text-[#807f7f]">
                Skipped{" "}
                {result.queResponses.reduce((totalSkipped, response) => {
                  return response.userAns.length === 0
                    ? (totalSkipped = totalSkipped + 1)
                    : totalSkipped;
                }, 0)}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full items-center justify-center gap-5 mt-10">
            {result.queResponses.map((response, i) => {
              return (
                <div className="border border-1 border-[#d6d4d4] flex flex-col rounded-md p-4 gap-6 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center justify-center">
                      <QuestionMark size={20} weight="fill" />

                      <p className="font-Satoshi-Medium text-black text-sm">
                        Question 1 <span className="text-[#807f7f]">•</span>
                      </p>
                      {response.correct ? (
                        <div className="bg-[#26a67e] w-4 h-4 rounded-tr-sm flex justify-center items-center rounded-bl-sm">
                          <Check size={10} weight="bold" color="#fff" />
                        </div>
                      ) : (
                        <div className="bg-[#b94443] w-4 h-4 rounded-tr-sm flex justify-center items-center rounded-bl-sm">
                          <X size={10} weight="bold" color="#fff" />
                        </div>
                      )}

                      <p className="font-Satoshi-Medium text-sm text-[#807f7f]">
                        {response.correct ? "Correct" : "Incorrect"}
                      </p>
                    </div>
                    <div className="flex items-center font-Satoshi-Bold justify-center gap-2">
                      <div className="flex items-center justify-center text-[13px] bg-[#f2f2f3] rounded-full gap-2 py-1 px-2">
                        {console.log(response.queType)}
                        <RenderQueType type={response.queType} iconsize={15} />
                      </div>
                      <div className="h-4 w-4 flex justify-center items-center rounded-full bg-yellow-500">
                        <Star size={10} weight="fill" color="#000" />
                      </div>
                      <p className="text-[#807f7f] text-sm font-Satoshi-Medium">
                        {response.points} Point
                      </p>
                    </div>
                  </div>
                  <p className="text-black text-md font-Satoshi-Bold">
                    {response.que}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {response.choices.length > 0 ? (
                      response.choices.map((choice, i) => {
                        return (
                          <div
                            className="font-Satoshi-Medium flex gap-1 items-center text-gray-700 bg-[#f2f2f3] w-fit px-4 p-1 rounded-full text-md"
                            key={i}
                          >
                            {response.expectedAns.includes(choice.id) ? (
                              <Check size={16} weight="bold" color="#26a67e" />
                            ) : (
                              <X size={16} weight="bold" color="#b94443" />
                            )}
                            {choice.text}
                          </div>
                        );
                      })
                    ) : (
                      <RenderCorrect
                        type={response.queType}
                        expectedAns={response.expectedAns}
                        userAns={response.userAns}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserQuizDetails;
