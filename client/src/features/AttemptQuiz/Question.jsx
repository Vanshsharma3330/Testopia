import { ArrowsOutSimple, QuestionMark } from "@phosphor-icons/react";
import { useCallback, useContext, useState } from "react";
import { QuizContext } from ".";
import NavigationBtns from "./navigateQuizBtns";
import MultipleChoice from "./queTypes/MultipleChoice";
import FillInTheBlank from "./queTypes/FillInTheBlank";
import TrueFalse from "./queTypes/TrueFalse";
import Matching from "./queTypes/Matching";
import { useDebounce } from "../../hooks/useDebounce";
import { AnimatePresence } from "framer-motion";
import Popup from "../../shared/components/popup";

export default function Question() {
  const {
    selectedQue,
    previewMode,
    response,
    serverResponse,
    ques,
    updateServerResponse,
    setResponse,
  } = useContext(QuizContext);
  const [showFullImage, setShowFullImage] = useState(false);
  const [saveDebounce, cancelSaveDebounce] = useDebounce(async (updated) => {
    updateServerResponse({ updated, responseId: serverResponse._id });
  }, 1000);

  const renderQuestion = (question) => {
    const existingRes =
      response.find((ele) => ele.queId === question._id) || {};

    switch (question.type) {
      case 1:
        return (
          <MultipleChoice
            key={question._id}
            updateResponse={updateResponse}
            que={question}
            response={existingRes}
          />
        );
      case 2:
        return (
          <FillInTheBlank
            key={question._id}
            updateResponse={updateResponse}
            que={question}
            response={existingRes}
          />
        );
      case 3:
        return (
          <TrueFalse
            key={question._id}
            updateResponse={updateResponse}
            que={question}
            response={existingRes}
          />
        );
      case 4:
        return (
          <Matching
            key={question._id}
            updateResponse={updateResponse}
            que={question}
            response={existingRes}
          />
        );
      default:
        return null;
    }
  };

  const updateResponse = useCallback(
    (obj) => {
      if (!previewMode) {
        cancelSaveDebounce();

        setResponse((prev) => {
          const existingIndex = prev.findIndex(
            (res) => res.queId === obj.queId,
          );
          console.log("obj is : ", obj);

          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = obj;

            saveDebounce({ quizResponse: updated });

            return updated;
          }
          console.log("prev is : ", [...prev, obj]);
          return [...prev, obj];
        });
      }
    },
    [response],
  );

  if (previewMode && ques.length == 0)
    return (
      <center>
        <h1>No Questions to Preview</h1>
      </center>
    );

  return (
    <div className="w-full px-48 py-3 flex gap-10 h-full relative">
      <div className="mid-left flex w-1/2 flex-col gap-3">
        <div className="flex gap-1 items-center pb-1">
          <QuestionMark size={19} weight="fill" />
          <h1 className="font-Satoshi-Bold text-sm">
            Question {selectedQue} of {ques?.length}
          </h1>
        </div>

        {ques && renderQuestion(ques[selectedQue - 1])}

        <NavigationBtns />
      </div>

      {ques[selectedQue - 1].imageUrl && (
        <div className="bg-white rounded-xl h-[400px] w-1/2 overflow-hidden relative">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: `url('${ques[selectedQue - 1].imageUrl}')`,
            }}
            onClick={() => setShowFullImage(true)}
          ></div>
          <button
            onClick={() => setShowFullImage(true)}
            className="bg-[#f3f3f3] p-1 absolute top-3 right-3 rounded-full"
          >
            <ArrowsOutSimple size={16} color="#5a4bea" />
          </button>
        </div>
      )}
      <AnimatePresence>
        {showFullImage && (
          <Popup action={() => setShowFullImage(false)} bg="bg-white">
            <img
              src={ques[selectedQue - 1].imageUrl}
              alt="Full size preview"
              className="mx-auto max-w-[80%] object-contain"
            />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
}
