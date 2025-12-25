import { ArrowLeft, Check, SealQuestion, X } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { parseDate } from "../../../helpers/parseDate";
import { AnimatePresence } from "framer-motion";
import Popup from "../../../shared/components/popup";
import UserQuizDetails from "../../../shared/components/userQuizDetails";
import { useState } from "react";
import { WorkspaceContext } from "../index";
import { useAuth } from "../../../hooks/useAuth";
import { useContext } from "react";

export default function QuizResponses() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showResults, setShowResults] = useState(false);
  const { selectedworkspace } = useContext(WorkspaceContext);

  const {
    data: quiz,
    isLoading: isQuizLoading,
    error: quizError,
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      try {
        const serverResponse = await axios.get(
          `http://localhost:5000/quiz/getQuiz?id=${quizId}`,
        );
        return serverResponse.data.quiz || null;
      } catch (err) {
        console.error("Error fetching quiz:", err);
        return null;
      }
    },
    enabled: !!quizId,
    refetchOnWindowFocus: false,
  });

  const {
    data: results,
    isLoading: isResultLoading,
    error: resultError,
  } = useQuery({
    queryKey: ["quizResults", quizId],
    queryFn: async () => {
      try {
        const serverResponse = await axios.post(
          `http://localhost:5000/response/results`,
          {
            quizId: quizId,
          },
        );
        return serverResponse.data.results || [];
      } catch (err) {
        console.error("Error fetching results:", err);
        return [];
      }
    },
    enabled: !!quizId,
    refetchOnWindowFocus: false,
  });

  if (isQuizLoading || isResultLoading) {
    return <div>Loading...</div>;
  }

  if (quizError || resultError) {
    return <div>Error loading data</div>;
  }

  if (!quiz) {
    return <div>No quiz found</div>;
  }

  return (
    <div className="w-full flex gap-20 mt-10 ">
      <div className="w-[35%] flex flex-col gap-4 h-full">
        <button
          className="p-1 rounded-md bg-[#f3f3f3] w-fit"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ArrowLeft size={18} weight="bold" />
        </button>

        {quiz.quizThumbnail && (
          <div className="w-full h-full">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:5000/uploads/${user.email}/${selectedworkspace.id}/${quiz.quizThumbnail}`}
              alt="Quiz Thumbnail"
            />
          </div>
        )}

        <p className="bg-[#d6fff2] gap-1 flex items-center w-fit text-[#16ab82] text-[13px] py-0.5 px-2 rounded-full">
          {quiz.published ? (
            <>
              <Check size={13} weight="bold" />
              Published
            </>
          ) : (
            <>
              <X size={13} color="#00d659" />
              Not Published
            </>
          )}
        </p>
        <h1 className="font-Satoshi-Black text-2xl/tight">{quiz.title}</h1>

        <div className="flex items-center justify-between ">
          <div className="flex gap-3 items-center">
            {quiz.category?.map((cate, i) => (
              <p
                key={i}
                className="text-[#797b7c] text-sm font-Satoshi-Medium p-[2px] px-[6px] rounded-full bg-[#f0f2f4]"
              >
                {cate}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center text-[13px] gap-1.5">
          <div className="flex items-center font-Satoshi-Bold gap-1.5 text-black">
            <SealQuestion size={17} weight="bold" />
            {quiz.questions?.length || 0} questions
          </div>
          <p className="text-gray-400 font-Satoshi-Medium">
            • Start Date {parseDate(quiz.startTime)}
          </p>
        </div>

        <div className="flex items-center mt-5 gap-10">
          <div>
            <p className="text-gray-400 font-Satoshi-Medium text-sm">
              Submissions
            </p>
            <h1 className="font-Satoshi-Bold text-xl">
              {results?.length || 0}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-[65%] pt-10">
        <h1 className="text-xl font-Satoshi-Black">Responses</h1>
        {results && results.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-black">
              {/* Table headers and content remain the same */}
              <thead className="text-xs text-black uppercase bg-[#f3f3f3] border-2">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Participant
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Accuracy
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Marks
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((response, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {response.firstname} {response.lastname}
                    </th>
                    <td className="px-6 py-4">
                      <p className="bg-[#d6fff2] gap-1 flex items-center w-fit text-black text-[13px] py-0.5 px-2 rounded-full">
                        <Check size={13} weight="bold" />
                        Submitted
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {response.grades?.percentage || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {response.grades?.earnedPoints || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => setShowResults(true)}
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <AnimatePresence>
              {showResults && (
                <Popup action={() => setShowResults(false)}>
                  <UserQuizDetails
                    result={results[0]}
                    setShowResults={setShowResults}
                  />
                </Popup>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div>No Data to Show</div>
        )}
      </div>
    </div>
  );
}
