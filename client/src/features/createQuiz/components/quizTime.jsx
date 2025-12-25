import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const QuizTime = ({ value, updateTimeLimit }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleHoursChange = (event) => {
    setHours(Math.min(Math.max(0, parseInt(event.target.value)), 99));
  };

  const handleMinutesChange = (event) => {
    setMinutes(Math.min(Math.max(0, parseInt(event.target.value)), 59));
  };

  const handleSecondsChange = (event) => {
    setSeconds(Math.min(Math.max(0, parseInt(event.target.value)), 59));
  };

  useEffect(() => {
    if (value) {
      setHours(Math.floor(value / 3600));
      setMinutes(Math.floor((value % 3600) / 60));
      setSeconds(value % 60);
    }
    updateTimeLimit(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds, value]);

  const incrementHours = () => setHours(Math.min(hours + 1, 99));
  const decrementHours = () => setHours(Math.max(hours - 1, 0));
  const incrementMinutes = () => setMinutes(Math.min(minutes + 1, 59));
  const decrementMinutes = () => setMinutes(Math.max(minutes - 1, 0));
  const incrementSeconds = () => setSeconds(Math.min(seconds + 1, 59));
  const decrementSeconds = () => setSeconds(Math.max(seconds - 1, 0));

  return (
    <div className="flex justify-center gap-8 bg-white h-full">
      <div className="flex">
        <input
          type="number"
          min="0"
          max="99"
          value={hours.toString().padStart(2, "0")}
          onChange={handleHoursChange}
          className="w-8.5 text-base outline-none pl-2 pr-0.5 py-1 rounded"
        />
        <h1 className="flex  flex-col items-center font-Satoshi-Bold text-sm">
          <button
            onClick={incrementHours}
            className="cursor-default px-2 py-0 text-xxs"
          >
            <CaretUp size={10} weight="bold" color="#9ca3af" />
          </button>
          Hours
          <button
            onClick={decrementHours}
            className="cursor-default px-2 py-0 text-xxs"
          >
            <CaretDown size={10} weight="bold" color="#9ca3af" />
          </button>
        </h1>
      </div>

      <div className="flex ">
        <input
          type="number"
          min="0"
          max="59"
          value={minutes.toString().padStart(2, "0")}
          onChange={handleMinutesChange}
          className="w-8.5 text-base outline-none pl-2 pr-0.5 py-1 rounded"
        />
        <h1 className="flex  flex-col items-center font-Satoshi-Bold text-sm">
          <button
            onClick={incrementMinutes}
            className="cursor-default px-2 py-0 text-xxs"
          >
            <CaretUp size={10} weight="bold" color="#9ca3af" />
          </button>
          Minutes
          <button
            onClick={decrementMinutes}
            className="cursor-default px-2 py-0 text-xxs"
          >
            <CaretDown size={10} weight="bold" color="#9ca3af" />
          </button>
        </h1>
      </div>

      <div className="flex">
        <input
          type="number"
          min="0"
          max="59"
          value={seconds.toString().padStart(2, "0")}
          onChange={handleSecondsChange}
          className="w-8.5 text-base outline-none pl-2 pr-0.5 py-1 rounded"
        />
        <h1 className="flex items-center flex-col font-Satoshi-Bold text-sm">
          <button
            onClick={incrementSeconds}
            className="cursor-default px-2 py-0 text-xxs"
          >
            <CaretUp size={10} weight="bold" color="#9ca3af" />
          </button>
          Seconds
          <button
            onClick={decrementSeconds}
            className="cursor-default px-2 py-0 text-xxs"
          >
            <CaretDown size={10} weight="bold" color="#9ca3af" />
          </button>
        </h1>
      </div>
    </div>
  );
};

export default QuizTime;
