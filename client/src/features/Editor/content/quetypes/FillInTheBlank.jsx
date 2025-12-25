import { useEffect, useState } from "react";
import QueTitle from "../queTitle";
import { FieldArray, Formik } from "formik";
import { useQues } from "../../../../hooks/useQues";
import QueHeader from "../queLayout/QueHeader";
import QueFooter from "../queLayout/QueFooter";
import { QuestionMark } from "@phosphor-icons/react";
import { Reorder, motion } from "framer-motion";
import Blank from "../queOptions/blanks";

export default function FillInTheBlank({ que, index }) {
  const [blankMismatch, setBlankMismatch] = useState(false);

  function splitString(str) {
    // Use regex to match [Blank] and other text
    const pattern = /(\[Blank\])|([^\[]+)/g;

    // Match all occurrences and filter out empty strings
    const matches = str.match(pattern).filter((match) => match.trim() !== "");

    return matches;
  }

  const { updateQuesContext } = useQues();

  return (
    <>
      <Formik initialValues={{ ...que }}>
        {(formik) => {
          const ModifyBlankFromQue = () => {
            const newQue = formik.values.que;

            if (newQue.length > 0) {
              const blanks = formik.values.correct;

              const queBlanks = newQue.match(/\[Blank\]/g) || [];

              if (queBlanks.length > blanks.length) {
                formik.setFieldValue("correct", [
                  ...correct,
                  { id: Date.now(), text: "" },
                ]);
              } else if (queBlanks.length < blanks.length) {
                setBlankMismatch(true);
              } else {
                setBlankMismatch(false);
              }
            }
          };

          const RemoveBlankUsingTrash = (index, remove) => {
            const matched = splitString(formik.values.que);

            let blankCount = 0;

            for (let i = 0; i < matched.length; i++) {
              if (matched[i] === "[Blank]") {
                if (blankCount === index) {
                  matched.splice(i, 1);
                  formik.setFieldValue("que", matched.join(""));
                  break;
                }
                blankCount++;
              }
            }

            remove(index);
          };

          useEffect(() => {
            ModifyBlankFromQue();
          }, [formik.values.que]);

          useEffect(() => {
            console.log(formik.values);

            const timer = setTimeout(() => {
              updateQuesContext({ ...formik.values }, index);
            }, 400);

            return () => clearTimeout(timer);
          }, [formik.values]);

          return (
            <>
              <QueHeader formik={formik} index={index} />
              <div className="flex pt-5 pb-2 items-center font-bold">
                <QuestionMark size={19} weight="fill" />
                <p className="ml-1 text-sm">Question {index + 1}</p>
              </div>

              <QueTitle form={{ ...formik.getFieldProps("que") }} />
              {blankMismatch && (
                <p className="text-red-500 text-[10px] font-Silka-Medium">
                  * Blanks Mismatch
                </p>
              )}

              <div className="flex pt-3 text-sm">
                <p className="border-r-[2.5px] pr-2 mr-4">Correct Blanks*</p>
              </div>

              <FieldArray name="correct">
                {({ remove, push }) => (
                  <>
                    <div className="mt-3 flex flex-col mb-3 overflow-x-hidden">
                      <Reorder.Group
                        axis="y"
                        values={formik.values.correct}
                        onReorder={(newOrder) => {
                          formik.setFieldValue("correct", newOrder);
                        }}
                      >
                        {formik.values.correct.map((blank, i) => {
                          return (
                            <Blank
                              key={blank.id}
                              i={i}
                              handleChanges={(e) =>
                                formik.setFieldValue(
                                  `correct[${i}].text`,
                                  e.target.value,
                                )
                              }
                              blank={blank}
                              remove={(i) => RemoveBlankUsingTrash(i, remove)}
                            />
                          );
                        })}
                      </Reorder.Group>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        formik.setFieldValue(
                          "que",
                          formik.values.que + "[Blank]",
                        );
                        push({
                          id: Date.now(),
                          text: "",
                        });
                      }}
                      className="border-dashed rounded-md border-[2px] font-Satoshi-Bold border-[#D7D9DB] text-xs ml-4 pr-4 pl-4 w-fit p-2 flex justify-center"
                    >
                      + Add Blank
                    </button>
                  </>
                )}
              </FieldArray>
              <QueFooter
                values={{
                  points: formik.values.points,
                  randomizedOptions: formik.values.randomizedOptions,
                }}
                updatePoints={(value) =>
                  formik.setFieldValue("points", value || 0)
                }
              />
            </>
          );
        }}
      </Formik>
    </>
  );
}
