import Content from "./content";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import QuizManager from "../createQuiz/QuizManager";
import { useState } from "react";
import { useQues } from "../../hooks/useQues";

export default function Editor() {
  // const [editQuizSettings, setEditQuizSettings] = useState(false);
  const { quiz } = useQues();

  // if(editQuizSettings) {
  //     return <QuizManager edit={true} quiz={quiz}/>
  // }

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] font-Satoshi-Medium bg-white">
      {/* Navbar */}
      <div className="h-[60px]">
        <Navbar />
      </div>

      <div className="flex" style={{ height: "calc(100% - 60px)" }}>
        {/* Sidebar */}
        <div className="w-[20%] p-4 pt-0 pb-0 bg-[#f7f7f6]  border-[#DDDDDD] border-r-2">
          <Sidebar />
        </div>

        {/* DropZoneBar */}
        <div className="w-[80%]">
          <Content />
        </div>

        {/* Content Bar */}
        {/* <div className="w-[20%]">
                        <OptionsBar/>
                    </div> */}
      </div>
    </div>
  );
}
