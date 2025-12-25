import { useContext } from "react";
import { QuizContext } from ".";

export default function NavigationBtns() {
  const { selectedQue, setSelectedQue, ques } = useContext(QuizContext);

  const handlePrevious = () => {
    setSelectedQue((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleContinue = () => {
    setSelectedQue((prev) => (prev < ques?.length ? prev + 1 : prev));
  };

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={handlePrevious}
        disabled={selectedQue === 1}
        className="font-Satoshi-Bold text-base gap-2 flex items-center justify-center bg-[#fefefe] shadow-md rounded-md px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={handleContinue}
        disabled={selectedQue === ques?.length}
        className="font-Satoshi-Bold gap-2 text-base flex items-center justify-center bg-[#4e41e8] shadow-md rounded-md px-4 py-2 text-white disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
