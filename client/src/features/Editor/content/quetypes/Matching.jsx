import { useEffect } from "react";
import QueTitle from "../queTitle";
import { FieldArray, Formik } from "formik";
import { useQues } from "../../../../hooks/useQues";
import QueHeader from "../queLayout/QueHeader";
import QueFooter from "../queLayout/QueFooter";
import { Info, QuestionMark } from "@phosphor-icons/react";
import { RearrangeableGroup } from "../../../../shared/components/rearrangeable";
import Match from "../queOptions/match";
import { motion } from "framer-motion";

export default function Matching({ que, index }) {
  const { updateQuesContext } = useQues();

  return (
    <>
      <Formik initialValues={{ ...que }}>
        {(formik) => {
          useEffect(() => {
            console.log("values t", formik.values);
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

              <div className="flex pt-3 text-sm">
                <p className="border-r-[2.5px] pr-2 mr-4">Matching Items *</p>
              </div>
              <FieldArray name="correct">
                {({ remove, push }) => (
                  <>
                    <RearrangeableGroup
                      values={formik.values.correct}
                      onReorder={(newOrder) => {
                        formik.setFieldValue("correct", newOrder);
                      }}
                    >
                      {formik.values.correct.map((match, i) => {
                        return (
                          <Match
                            key={match.id}
                            i={i}
                            match={match}
                            remove={(i) => remove(i)}
                            handleChanges={(e, field) =>
                              formik.setFieldValue(
                                `correct[${i}].${field}`,
                                e.target.value,
                              )
                            }
                          />
                        );
                      })}
                    </RearrangeableGroup>
                    <p className="text-[12px] gap-1 pr-20 justify-end flex items-center font-Satoshi-Medium">
                      <Info size={18} />
                      options to match will automatically shuffle for each
                      participant
                    </p>
                    <button
                      layout
                      type="button"
                      onClick={() => {
                        push({
                          id: Date.now(),
                          field: "",
                          match: "",
                        });
                      }}
                      className="border-dashed rounded-md border-[2px] font-Satoshi-Bold border-[#D7D9DB] text-xs mt-5 pr-4 pl-4 w-fit p-2 flex justify-center"
                    >
                      + Add Match Option
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
