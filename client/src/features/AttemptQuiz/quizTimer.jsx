import { useContext, useEffect, useRef } from "react";
import { QuizContext } from ".";
import { FormatTimerTime } from "../../helpers/formatTime";

export default function QuizTimer() {
  const { timer, setTimer, setEndQuiz } = useContext(QuizContext);

  useEffect(() => {
    let intervalId;

    if (timer.started && timer.time > 0) {
      const startTime = Date.now();
      intervalId = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = Math.max(0, timer.time - elapsedSeconds);

        setTimer((prevTimer) => ({
          ...prevTimer,
          time: remainingTime,
        }));
      }, 1000);
    } else if (!timer.started && timer.time <= 0) {
      clearInterval(intervalId);
      setEndQuiz(true);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timer.started, timer.time]);
  const { hours, minutes, seconds } = FormatTimerTime(timer.time);

  return (
    <>
      <h1 className="text-[#747474] text-base font-Satoshi-Bold">
        Time Left :
      </h1>
      <div className="h-7 w-7 rounded-md bg-black text-white flex items-center justify-center font-Satoshi-Medium text-base">
        {hours}
      </div>
      <h1>:</h1>
      <div className="h-7 w-7 rounded-md bg-black text-white flex items-center justify-center font-Satoshi-Medium text-base">
        {minutes}
      </div>
      <h1>:</h1>
      <div className="h-7 w-7 rounded-md bg-black text-white flex items-center justify-center font-Satoshi-Medium text-base">
        {seconds}
      </div>
    </>
  );
}
