import { RearrangeableItem } from "../../../../shared/components/rearrangeable";

export default function Choice({
  choice,
  handleChanges,
  index,
  remove,
  setCorrect,
  correct,
}) {
  //modifies correct marked items
  const handleRadioChange = () => {
    if (correct.includes(choice.id)) {
      setCorrect(correct.filter((choiceId) => choice.id !== choiceId));
    } else {
      setCorrect([...correct, choice.id]);
    }
  };

  return (
    <div className="mt-3 mb-3">
      <RearrangeableItem i={index} value={choice} remove={remove}>
        <div className="inline-flex items-center">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              onChange={handleRadioChange}
              checked={correct.includes(choice.id)}
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none border-[2.5px] border-[#DDDDDD] rounded-full checked:bg-[#6466E9] checked:border-[#6466E9]"
              id="check"
            />

            {/* above input renders this folllowing component to show checked mark */}
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
        </div>
        <input
          type="text"
          onChange={(e) => handleChanges(e)}
          value={choice.text}
          className="font-Satoshi-Medium outline-none w-[100%] pl-4 pr-4 p-[2.5px] rounded-sm text-[16px] bg-[#F3F3F3]"
        />
      </RearrangeableItem>
    </div>
  );
}
