import React from "react";
import QuizOverviewCard from "../../../shared/components/common/QuizOverviewCard";

const BrowseQuizzes = () => {
  return (
    <>
      <div className="flex flex-col gap-6 relative max-w-7xl mx-auto">
        <div className="absolute bg-black w-12 h-12 rounded-full right-0 bottom-4 shadow-2xl"></div>

        <div className="browseQuizNav flex items-center justify-between py-3 px-7">
          <div className="flex gap-3 items-center justify-center">
            <div className="flex items-center justify-center bg-[#efeef9] py-1 px-4 rounded-md text-[#736ba9] font-Satoshi-Medium text-md border border-1 border-[#ddd9f5]">
              <h1>
                Total Question:{" "}
                <span className="font-Satoshi-Bold">5 or more X</span>
              </h1>
            </div>
            <h1 className="text-[#736ba9] font-Satoshi-Bold">Reset</h1>
            <div className="h-7 w-0.5 bg-gray-100 rounded-md"></div>
            <div className="w-5 h-5 rounded-full bg-gray-700"></div>
            <h1 className="text-black text-md font-Satoshi-Bold">Add Filter</h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 rounded-full bg-gray-700"></div>
            <h1 className="text-black text-md font-Satoshi-Bold">
              Date Created
            </h1>
            <div className="flex items-center justify-center w-20 h-10">
              <div className="bg-[#ceced6] w-1/2 h-full rounded-tl-md rounded-bl-md"></div>
              <div className="bg-[#f2f4f3] w-1/2 h-full rounded-br-md rounded-tr-md"></div>
            </div>
          </div>
        </div>

        <div className="w-full px-7">
          <div className="afterBrowseNav flex items-center gap-4 mb-6">
            <h1 className="text-black text-md font-Satoshi-Bold">
              100 Content
            </h1>
            <div className="h-7 w-0.5 bg-gray-100 rounded-md"></div>
            <div className="w-5 h-5 rounded-full bg-gray-700"></div>
            <input
              placeholder="Search"
              className="text-gray-500 font-Satoshi-Medium"
            ></input>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <QuizOverviewCard />
            <QuizOverviewCard />
            <QuizOverviewCard />
            <QuizOverviewCard />
            <QuizOverviewCard />
            <QuizOverviewCard />
            <QuizOverviewCard />
            <QuizOverviewCard />
            <QuizOverviewCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseQuizzes;
