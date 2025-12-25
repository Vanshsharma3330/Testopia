import { useContext } from "react";

import { QuizContext } from ".";

export default function NotSure({ que, updateResponse }) {
  const handleCheck = () => {
    if (que.notsure) {
      updateResponse({ ...que, notsure: 0 });
    } else {
      updateResponse({ ...que, notsure: 1 });
    }
  };

  return (
    <div
      className="flex gap-2 pt-5 font-Satoshi-Medium text-[#6b6b6b] text-base"
      onClick={handleCheck}
    >
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          readOnly
          checked={que.notsure == 1 ? true : false}
          className="peer h-4 w-4 cursor-pointer transition-all appearance-none border-[1.5px] border-gray-400 rounded checked:bg-[#6466E9] checked:border-[#6466E9]"
          id="check"
        />

        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      I am not sure about this one
    </div>
  );
}
