import { useState } from "react";
import Question from "./queLayout/Question";
import { useQues } from "../../../hooks/useQues";
import { AnimatePresence } from "framer-motion";
import Backdrop from "../../../shared/components/backdrop";
import quizpic from "../../../assets/img/createquiz.svg";
import SelectQueBar from "./selectQueBar";
import { Pencil } from "@phosphor-icons/react";

export default function Content() {
  const { ques } = useQues();
  const [showTypes, setShowTypes] = useState(false);

  return (
    <div
      className="flex flex-col align-middle scoll-pt-10 h-[100%] overflow-auto scrollbar font-Stoshi-Medium"
      id="content"
    >
      {ques.length == 0 ? (
        <div className="grid place-content-center pt-20 pb-10 text-center">
          <img className="max-w-80 max-h-80" src={quizpic} alt="" />
          <p className="mt-4 font-Satoshi-Medium text-md">
            Add a question to get started
          </p>
        </div>
      ) : (
        ques.map((q, i) => {
          return <Question key={i} index={i} question={q} />;
        })
      )}

      <div className="flex  justify-center">
        <button
          onClick={() => setShowTypes(!showTypes)}
          className="relative border-2 border-[#9e9da0] flex font-Silka-Semibold mt-10 text-sm items-center rounded-lg pl-3 pr-3 p-1.5 mb-20"
        >
          <Pencil size={16} className="mr-2" />
          Create New Question
          <AnimatePresence>
            {showTypes && (
              <Backdrop action={() => setShowTypes(false)}>
                {" "}
                <SelectQueBar setShowTypes={setShowTypes} actionType="add" />
              </Backdrop>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
