import { useFormik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import cross from "../../assets/img/cross.svg";
import handleTextboxSize from "../../helpers/handleTextboxSize";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Images } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import QuizOptions from "./quizOptions";
import QuizTime from "./components/quizTime";
import quizValidationSchema from "../../schemas/quiz";
import { useParams, useSearchParams } from "react-router-dom";
import RenderFormikError from "../../shared/components/renderFormikError"; // Updated import
import { useToast } from "../../hooks/useToast";
import { useCreateQuiz } from "./api/createQuiz";
import { useUpdateQuiz } from "./api/updateQuiz";
import Spinner from "../../shared/components/loaders/spinner";
import { useLocation } from "react-router-dom";

export default function QuizManager({ quiz }) {
  const { user } = useAuth();
  const Toast = useToast();
  const imageInputRef = useRef(null);
  const { workspaceId } = useParams();
  const [searchparams, setsearchparams] = useSearchParams();
  const now = new Date();
  const location = useLocation();
  const edit = location.state ? true : false;
  quiz = location.state;

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    console.log("editing ", searchparams.get("edit"));
  }, [searchparams]);

  const formik = useFormik({
    initialValues: {
      quizThumbnail: "" || quiz?.quizThumbnail,
      title: quiz?.title || "",
      desc: quiz?.desc || "",
      timeLimit: quiz?.timeLimit || 0,
      category: quiz?.category || [],
      settings: {
        shuffleQues: false,
        adaptiveQueBank: false,
        shuffleOptions: quiz?.settings?.shuffleOptions || false,
        showQueAnswers: quiz?.settings?.showQueAnswers || false,
      },
      startTime: quiz?.startTime || new Date().toISOString(),
      lineantTime: quiz?.lineantTime > 0 ? quiz?.lineantTime : 0,
      published: 0,
    },
    validationSchema: quizValidationSchema,
    onSubmit: (values) => {
      console.log("ok");
      if (edit) {
        updateQuiz({ values, user, workspaceId, quizId: quiz._id });
      } else {
        console.log("creating quiz", { values, user, workspaceId });
        createQuiz({ values, user, workspaceId });
      }
    },
  });

  const updateSetting = (key, value) => {
    formik.setFieldValue("settings", {
      ...formik.values.settings,
      [key]: value,
    });
  };

  const { mutate: updateQuiz, isPending: updatePending } = useUpdateQuiz({
    onSuccess: (data) => {
      if (data.success) {
        window.history.back();
      }
    },
    onError: (error) => {
      Toast(2, "Failed to update quiz. Please try again.", 4000);
      console.log("An error occurred while updating the quiz:", error);
    },
  });

  const { mutate: createQuiz, isPending: createPending } = useCreateQuiz({
    onSuccess: (data) => {
      if (data.success) {
        window.history.back();
      }
    },
    onError: (error) => {
      Toast(2, "Failed to create quiz. Please try again.", 4000);
      console.log("An error occurred while creating the quiz:", error);
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("quizThumbnail", file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const modifyCategory = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      formik.setFieldValue("category", [
        ...formik.values.category,
        e.target.value.trim(),
      ]);
      e.target.value = "";
    }

    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      formik.values.category.length > 0
    ) {
      formik.setFieldValue("category", formik.values.category.slice(0, -1));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="w-screen relative h-full scrollbar bg-white"
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <div className="flex z-50 justify-between sticky top-0 p-3 pl-7 pr-7 font-Satoshi-Bold border-b-2 items-center bg-white text-sm">
          <button
            className="p-1 rounded-md bg-[#f3f3f3]"
            onClick={() => {
              window.history.back();
            }}
          >
            <img src={cross} alt="" />
          </button>
          <h1 className="text-md font-Satoshi-Black">
            {edit ? "Update" : "Create New"} Quiz
          </h1>
          <button
            type="submit"
            className="bg-[#5a4bea] text-white font-Satoshi-Bold p-[6px] pr-3 pl-3 text-sm rounded-md"
            onClick={async () => {
              const errors = await formik.validateForm();
              if (Object.keys(errors).length) {
                formik.setTouched(
                  Object.keys(formik.values).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                  }, {}),
                  true,
                );
                const firstError = Object.values(errors)[0];
                Toast(
                  2,
                  typeof firstError === "string"
                    ? firstError
                    : "Please fix the errors and try again.",
                  4000,
                );
                return;
              }
              formik.handleSubmit();
            }}
          >
            {createPending || updatePending ? "Loading" : "Continue"}
          </button>
        </div>
        {createPending ? (
          <div className="mt-40">
            <Spinner text={"Creating Quiz..."} />
          </div>
        ) : (
          <>
            {/* content div for quiz */}
            <div className="flex w-full pb-10 pl-20">
              {/* quiz creation data */}
              <div className="flex flex-col w-[50%] ml-auto mr-auto  mt-10">
                <motion.div
                  layout
                  initial={{ y: 30 }}
                  exit={{ y: 30 }}
                  animate={{ y: 0 }}
                  transition={{
                    ease: "linear",
                    duration: 0.1,
                  }}
                  className="w-full"
                >
                  {/* Image selecting logic */}
                  <div className="flex flex-col gap-5 ml-auto mr-auto">
                    {/* displays image which is selected */}
                    <div
                      className={`w-[100%] relative z-50 h-40 mb-5 rounded-tl-xl rounded-tr-xl ${
                        thumbnailPreview || quiz?.quizThumbnail
                          ? ""
                          : "bg-[#28a0dc]"
                      } bg-cover bg-center`}
                      style={{
                        backgroundImage: `url('${
                          thumbnailPreview
                            ? thumbnailPreview
                            : `http://localhost:5000/uploads/${user.email}/${quiz?.workspace}/${quiz?.quizThumbnail}`
                        }')`,
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        name="quizthumbnail"
                        ref={imageInputRef}
                        onChange={(e) => handleImageUpload(e)}
                        hidden
                      />
                      <button
                        onClick={() => imageInputRef.current.click()}
                        className="font-Satoshi-Bold p-1 rounded-md text-xs bg-white pr-1 pl-1 flex items-center gap-1 absolute bottom-3 right-3"
                      >
                        <Images size={16} /> Add Thumbnail
                      </button>
                    </div>
                    <RenderFormikError field="quizThumbnail" formik={formik} />

                    {/* captures other details of quiz */}
                    <div className="mb-5">
                      <input
                        className="outline-none text-3xl font-Satoshi-Black"
                        type="text"
                        name="quiz-title"
                        placeholder="Title of this Quiz?"
                        {...formik.getFieldProps("title")}
                      />
                      <RenderFormikError field="title" formik={formik} />
                    </div>

                    {/* categories */}
                    <div className="text-base h-fit font-Silka-Bold flex justify-normal text-[#5f5f5f]">
                      <p className="mr-2 w-[30%]">Category</p>
                      <div className="flex flex-wrap gap-y-2 w-[70%]">
                        {formik.values.category.map((cate, i) => {
                          return (
                            <div
                              className="mr-1 ml-1 text-[#797b7c] text-sm font-Satoshi-Medium p-[2px] px-[9px] rounded-full bg-[#f0f2f4]"
                              key={i}
                            >
                              {cate.length > 16
                                ? cate.substring(0, 16) + "..."
                                : cate}
                            </div>
                          );
                        })}
                        <input
                          type="text"
                          placeholder="Empty"
                          onKeyDown={(e) => modifyCategory(e)}
                          className="outline-none h-7 text-base ml-3 font-Silka-Medium"
                        />
                      </div>
                    </div>
                    <RenderFormikError field="category" formik={formik} />

                    <div className="text-base h-11 items-center font-Silka-Bold flex justify-normal text-[#5f5f5f]">
                      <p className="mr-2 w-[30%]">Expected Duration</p>
                      <QuizTime
                        value={formik.values.timeLimit}
                        updateTimeLimit={(value) =>
                          formik.setFieldValue("timeLimit", value)
                        }
                      />
                    </div>
                    <RenderFormikError field="timeLimit" formik={formik} />

                    <div className="text-base items-center h-11 relative font-Silka-Bold flex justify-normal text-[#5f5f5f]">
                      <p className="mr-2 w-[30%]">Start Time</p>
                      <button
                        onClick={() => {
                          document.getElementById("datePicker").showPicker();
                        }}
                        className="ml-2 relative z-50 flex items-center gap-3"
                      >
                        <Calendar size={22} color="#5f5f5f" weight="bold" />
                        <p>
                          {formik.values.startTime &&
                            new Date(formik.values.startTime).toLocaleString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                        </p>
                      </button>

                      <input
                        id="datePicker"
                        type="datetime-local"
                        className="border absolute cursor-pointer transform translate-x-1/2 opacity-0 z-10 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        min={now.toISOString().slice(0, 16)}
                        value={
                          new Date(formik.values.startTime)
                            .toISOString()
                            .slice(0, 16) || new Date()
                        }
                        onChange={(e) => {
                          if (new Date(e.target.value) > now) {
                            formik.setFieldValue("startTime", e.target.value);
                          }
                        }}
                      />
                    </div>
                    <RenderFormikError field="startTime" formik={formik} />

                    <div className="text-base items-center font-Silka-Bold flex justify-normal text-[#5f5f5f]">
                      <p className="mr-2 w-[30%]">Start till</p>
                      <QuizTime
                        value={formik.values.lineantTime}
                        updateTimeLimit={(value) =>
                          formik.setFieldValue("lineantTime", value)
                        }
                      />
                    </div>
                    <RenderFormikError field="lineantTime" formik={formik} />

                    {/* textarea for capturing description */}
                    <div className="w-full relative text-[#5f5f5f] mt-7">
                      <textarea
                        {...formik.getFieldProps("desc")}
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleTextboxSize(e, 40);
                        }}
                        type="text"
                        className="w-full pb-5 border-b-2 resize-none  overflow-hidden font-Satoshi-Medium text-md !leading-6 outline-none rounded-sm"
                        placeholder="Type description here..."
                      />
                      <p className="absolute right-0 bottom-[-10] font-Satoshi-Bold text-xs text-gray-700">
                        <span
                          className={`${
                            formik.values.desc.length > 400 && "text-red-500"
                          }`}
                        >
                          {formik.values.desc.length}
                        </span>{" "}
                        / 400
                      </p>
                    </div>
                    <RenderFormikError field="desc" formik={formik} />
                  </div>
                </motion.div>
              </div>

              {/* Options bar */}
              <QuizOptions
                settings={{
                  ...formik.getFieldProps("settings"),
                }}
                updateSetting={updateSetting}
              />
            </div>
          </>
        )}
        {/* Navbar for the quiz maker */}
      </motion.div>
    </AnimatePresence>
  );
}

// function Category({ title, formik }) {
//     return <div className="text-sm font-Silka-Bold mt-4 flex justify-normal text-[#5f5f5f]">
//         <p className="mr-2 w-[30%]">{title}</p>
//         <input type="text" placeholder="Empty" {...formik} className="outline-none ml-3 font-Silka-Medium" />
//     </div>
// }1
