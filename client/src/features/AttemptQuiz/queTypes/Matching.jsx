import { useEffect, useState } from "react";
import NotSure from "../notsure";
import {
  RearrangeableGroup,
  RearrangeableItem,
} from "../../../shared/components/rearrangeable";
import seededShuffle from "../../../helpers/shuffle";

export default function Matching({ que, response, updateResponse }) {
  const [correct, setCorrect] = useState(() => {
    const responseMap = new Map(
      (response.correct || []).map((item) => [item.id, item]),
    );

    const initialItems = que.correct.map((item) => {
      return (
        responseMap.get(item.id) || {
          id: item.id,
          match: item.match,
        }
      );
    });

    return seededShuffle(initialItems, 10);
  });

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
        <h1 className="font-Satoshi-Bold text-2xl/tight">{que.que}</h1>
        <h1 className="font-Satoshi-Medium text-[#6b6b6b] text-sm mt-5 mb-3">
          Match the following
        </h1>
        <div className="flex flex-col gap-3 h-52 relative">
          <RearrangeableGroup
            values={correct}
            onReorder={(newOrder) => setCorrect(newOrder)}
          >
            {que.correct.map((matchField, i) => {
              return (
                <div
                  key={correct[i]?.id}
                  className="w-full gap-3 mb-4 flex items-center font-Satoshi-Bold text-md"
                >
                  {console.log(correct, i)}
                  <h1 className="w-6 py-auto">{i + 1}.</h1>
                  <div className="bg-[#fefefe] h-[1.87rem] rounded-lg w-1/2 outline-none px-3 py-1">
                    <h1>{matchField.field}</h1>
                  </div>

                  <div className="w-1/2">
                    <RearrangeableItem i={i} value={correct[i]}>
                      <div className="bg-[#fefefe] w-full rounded-lg py-1 px-4">
                        <p>{correct[i].match}</p>
                      </div>
                    </RearrangeableItem>
                  </div>
                </div>
              );
            })}
          </RearrangeableGroup>
        </div>
      </div>
      <NotSure que={response} updateResponse={updateResponse} />
    </>
  );
}
