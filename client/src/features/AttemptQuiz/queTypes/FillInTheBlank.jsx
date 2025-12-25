import { useEffect, useState } from "react";
import { QuizContext } from "..";
import { useContext } from "react";
import NotSure from "../notsure";

export default function FillInTheBlank({ que, response, updateResponse }) {
  const [correct, setCorrect] = useState(response?.correct || []);

  useEffect(() => {
    updateResponse({
      queId: que._id,
      correct: correct,
      notsure: response?.notsure || 0,
    });
  }, [correct, setCorrect]);

  return (
    <>
      <div className="h-96 overflow-auto pr-5">
        <h1 className="font-Satoshi-Bold text-2xl/tight">
          {que.que.split(/\[Blank\]/g).map((str, i) => {
            if (str == "") {
              return <span className="-tracking-[3.5px] ml-2">_________</span>;
            } else {
              return str;
            }
          })}
        </h1>
        <h1 className="font-Satoshi-Medium text-[#6b6b6b] text-sm mt-5 mb-3">
          Fill out the answers in following
        </h1>
        <div className="flex flex-col gap-3 h-52 relative">
          {que.correct.map((blank, i) => {
            return (
              <div
                key={blank.id}
                className="flex relative items-center gap-3 w-full font-Satoshi-Bold text-md"
              >
                <h1 className="absolute left-4">{i + 1}.</h1>
                <input
                  type="text"
                  className=" bg-[#fefefe] rounded-lg w-full outline-none px-9 py-3 "
                  id={blank._id}
                  value={correct[i]?.text || ""}
                  onChange={(e) =>
                    setCorrect((prev) => {
                      const updated = [...prev];
                      updated[i] = {
                        id: blank.id,
                        text: e.target.value,
                      };
                      console.log(updated);
                      return updated;
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <NotSure que={response} updateResponse={updateResponse} />
    </>
  );
}
