import {
  ClockCountdown,
  SealCheck,
  SquaresFour,
  Star,
  X,
} from "@phosphor-icons/react";
import { useContext } from "react";
import { QuizContext } from ".";
import QuizTimer from "./quizTimer";

export default function Navbar() {
  const { ques, previewMode, setQuesNav, setEndQuiz } = useContext(QuizContext);

  return (
    <>
      <div className="flex items-center h-[10%] pt-5 pl-10 pb-5 pr-10 border-b-2 bg-white/50 justify-between">
        {/* left part */}
        <div className="flex items-center gap-6">
          <button className="p-[6px] rounded-md bg-[#e6e6e6]">
            <a href="/admin/dashboard">
              <X size={19} />
            </a>
          </button>
          <div className="flex items-center gap-1">
            <ClockCountdown size={19} color="#747474" />
            <QuizTimer key={10} />
          </div>
        </div>
        <div className="nav-right flex items-center gap-4">
          <div className="flex items-center gap-2 font-Satoshi-Bold text-sm">
            <div className="h-5 w-5 flex justify-center items-center rounded-full bg-yellow-500">
              <Star size={11} weight="fill" />
            </div>
            <h1 className="text-base">
              {ques.reduce((total, q) => total + (q.points || 0), 0)}
            </h1>
          </div>

          <button
            className="text-base rounded-lg border-2 font-Satoshi-Bold flex items-center gap-2 bg-white px-2.5 py-1.5"
            onClick={() => setQuesNav(true)}
          >
            <SquaresFour size={19} weight="bold" />
            Quiz Nav
          </button>

          <button
            disabled={previewMode}
            onClick={() => setEndQuiz(true)}
            className="disabled:opacity-70 text-base rounded-lg border-2 font-Satoshi-Bold flex items-center gap-2 bg-white px-2.5 py-1.5"
          >
            <SealCheck size={19} weight="bold" />
            Submit Quiz
          </button>
        </div>
      </div>
    </>
  );
}
