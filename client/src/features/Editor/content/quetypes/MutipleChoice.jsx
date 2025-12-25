import { useEffect } from "react";
import { useQues } from "../../../../hooks/useQues";
import { QuestionMark } from "@phosphor-icons/react";
import Choice from "../queOptions/choice";
import QueTitle from "../queTitle";
import { FieldArray, Form, Formik } from "formik";
import QueFooter from "../queLayout/QueFooter";
import QueHeader from "../queLayout/QueHeader";

import { motion } from "framer-motion";
import { RearrangeableGroup } from "../../../../shared/components/rearrangeable";

export default function MultipleChoice({ que, index }) {
  const { updateQuesContext } = useQues();

  return (
    <>
      <Formik initialValues={{ ...que }}>
        {(formik) => {
          useEffect(() => {
            console.log(formik.values);
            const timer = setTimeout(() => {
              updateQuesContext({ ...formik.values }, index);
            }, 400);

            return () => clearTimeout(timer);
          }, [formik.values]);

          return (
            <Form>
              <QueHeader formik={formik} index={index} />
              <div className="flex pt-5 pb-2 items-center font-bold">
                <QuestionMark size={19} weight="fill" />
                <p className="ml-1 text-sm">Question {index + 1}</p>
              </div>
              <QueTitle form={formik.getFieldProps("que")} />

              <div className="flex pt-3 text-sm">
                <p className="border-r-[2.5px] pr-2 font-Satoshi-Bold mr-4">
                  Choices *
                </p>
              </div>
              <FieldArray name="choices">
                {({ remove, push }) => (
                  <>
                    <div className="mt-3 flex flex-col mb-3 overflow-x-hidden">
                      <RearrangeableGroup
                        values={formik.values.choices}
                        onReorder={(newOrder) => {
                          formik.setFieldValue("choices", newOrder);
                        }}
                      >
                        {formik.values.choices.map((choice, i) => (
                          <Choice
                            choice={choice}
                            key={choice.id}
                            index={i}
                            setCorrect={(value) => {
                              formik.setFieldValue("correct", value);
                            }}
                            handleChanges={(e) =>
                              formik.setFieldValue(
                                `choices[${i}].text`,
                                e.target.value,
                              )
                            }
                            remove={(i) =>
                              formik.values.choices.length > 0 && remove(i)
                            }
                            correct={formik.values.correct}
                          />
                        ))}
                      </RearrangeableGroup>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: Date.now(),
                          text: "",
                        })
                      }
                      className="border-dashed rounded-md border-[2px] font-Satoshi-Bold border-[#D7D9DB] text-xs ml-10 pr-4 pl-4 w-fit p-2 flex justify-center"
                    >
                      + Add Choice
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
                updateRandomized={(value) =>
                  formik.setFieldValue("randomizedOptions", value)
                }
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
