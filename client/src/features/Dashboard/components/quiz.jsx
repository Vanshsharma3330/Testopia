import { useState } from "react";
import {
  ArrowUpRight,
  DotsThree,
  NotePencil,
  Pencil,
  PencilLine,
  PencilSimpleLine,
  Play,
  Ranking,
  SealQuestion,
  Trash,
} from "@phosphor-icons/react";
import DropdownMenu from "../../../shared/components/dropdownMenu";
import HamburgerLink from "../../../shared/components/hamburgerLink";
import { useNavigate } from "react-router-dom";
import { useDeleteQuiz } from "../api/useDeleteQuiz";
import { useAuth } from "../../../hooks/useAuth";

export default function Quiz({ quiz, selectedworkspace, refetchQuizzes }) {
  const [dropdown, showDropdown] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: deleteQuiz } = useDeleteQuiz({
    onSuccess: (data) => {
      if (data.success) {
        refetchQuizzes();
      }
    },
    onError: (err) => {
      console.log("error while deleting quiz : ", err);
    },
    refetchQuizzes: refetchQuizzes,
  });

  return (
    <div className="bg-white border-2 flex flex-col gap-3 h-auto rounded-xl p-2 cursor-pointer">
      {/* Line 1: Thumbnail and Stats */}
      <div className="relative bg-yellow-600 h-32 rounded-xl p-2">
        {quiz.quizThumbnail && (
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
            src={`http://localhost:5000/uploads/${user.email}/${selectedworkspace.id}/${quiz.quizThumbnail}`}
            alt="Quiz Thumbnail"
          />
        )}
      </div>

      <div className="px-3 flex flex-col gap-5 overflow-hidden">
        <h1 className="text-black font-Satoshi-Bold text-xl text-wrap break-all">
          {quiz.title.length > 55
            ? quiz.title.substring(0, 55) + "..."
            : quiz.title}
        </h1>

        {/* Line 4: Tags */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-4">
            <div className="line4 flex items-center justify-between ">
              <div className="flex gap-3 items-center">
                {quiz.category.map((cate, i) => {
                  return (
                    <p
                      key={i}
                      className="text-[#797b7c] text-[13px] font-Satoshi-Medium p-[2px] px-[6px] rounded-full bg-[#f0f2f4]"
                    >
                      {cate}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Line 5: Footer */}
            <div className="line5 flex items-center justify-between">
              <div className="flex gap-2 items-center text-xs">
                <p className="font-Satoshi-Medium text-gray-600 ">
                  Created{" "}
                  {new Date(quiz.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="text-[5px]">●</div>
                <div className="flex items-center font-Satoshi-Bold text-black gap-1">
                  <SealQuestion size={14} weight="bold" />
                  {quiz.questions.length} Questions
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col gap-3">
                        <a href={`/admin/editor/${selectedworkspace.id}/${quiz._id}`} onClick={(e) => e.stopPropagation()}>
                            <button className="border-2 p-1 rounded-full">
                                <ArrowUpRight size={14} />
                            </button>
                        </a>
                        <button className="bg-white border-2 p-1 rounded-full" onClick={(e) => { e.stopPropagation(); showDropdown(true); }}>
                            <DotsThree size={14} />
                            <div className="text-black gap-2 flex">
                                {dropdown && (
                                    <DropdownMenu dropdown={dropdown} setDropdown={showDropdown}>
                                        {/* <HamburgerLink icon={<Pencil size={18} />} title="Edit" action={() => {  }} /> */}
          {/* <HamburgerLink icon={<Trash size={18} color="#ff0000" />} title="Delete" action={() => deleteQuiz(quiz._id)} />
                                    </DropdownMenu>
                                )}
                            </div>
                        </button>
                    </div> */}
        </div>

        <div className="text-sm flex justify-between">
          <button
            className="bg-[#5a4bea] rounded-sm gap-2 justify-center p-1 w-[85%] flex items-center text-white"
            onClick={() =>
              window.open(`/admin/editor/${selectedworkspace.id}/${quiz._id}`)
            }
          >
            <NotePencil size={17} weight="bold" />
            Edit Quiz
          </button>
          <button
            className="bg-white border-2 p-1 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              showDropdown(true);
            }}
          >
            <DotsThree size={16} weight="bold" />
            <div className="text-black gap-2 flex">
              {dropdown && (
                <DropdownMenu dropdown={dropdown} setDropdown={showDropdown}>
                  {/* <HamburgerLink icon={<Pencil size={18} />} title="Edit" action={() => {  }} /> */}
                  <HamburgerLink
                    icon={<Ranking size={18} color="#00000" />}
                    title="Result"
                    action={() => navigate(`${quiz._id}`)}
                  />
                  <HamburgerLink
                    icon={<Trash size={18} color="#ff0000" />}
                    title="Delete"
                    action={() => deleteQuiz(quiz._id)}
                  />
                </DropdownMenu>
              )}
            </div>
          </button>
        </div>

        <div className="text-sm flex justify-between px-10 pb-2">
          <button
            className="flex items-center gap-1 font-medium"
            onClick={() => window.open(`/preview/${quiz._id}`, "_blank")}
          >
            <Play size={15} weight="bold" />
            Preview
          </button>
          <button
            className="flex items-center gap-1 font-medium"
            onClick={(e) => {
              navigate(`/admin/dashboard/create/${quiz._id}?edit=true`, {
                state: quiz,
              });
              e.stopPropagation();
            }}
          >
            <PencilSimpleLine size={17} weight="bold" />
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
}
