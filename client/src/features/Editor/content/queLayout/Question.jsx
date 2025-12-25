import { useQues } from "../../../../hooks/useQues";
import { useRef } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import MultipleChoice from "../quetypes/MutipleChoice";
import TrueFalse from "../quetypes/TrueFalse";
import FillInTheBlank from "../quetypes/FillInTheBlank";
import Matching from "../quetypes/Matching";
import { scrolltoQue } from "../../sidebar";

export default function Question({ question, index }) {
  const { setSelectedQue, selectedQue, ques } = useQues();

  const ref = useRef(null);

  //above code weren't working so we used this one
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelectedQue(index);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.7 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    scrolltoQue(ques.length - 1);
  }, [ques.length]);

  const renderQuestion = () => {
    switch (question.type) {
      case 1:
        return <MultipleChoice key={index} que={question} index={index} />;
      case 2:
        return <FillInTheBlank key={index} que={question} index={index} />;
      case 3:
        return <TrueFalse key={index} que={question} index={index} />;
      case 4:
        return <Matching key={index} que={question} index={index} />;
    }
  };

  return (
    <div className="p-5">
      <motion.div
        layout
        layoutRoot
        className="border-[#DDDDDD] border-[1.5px] scroll-pb-20 rounded-lg w-[100%] overflow-auto flex"
        ref={ref}
        id={"que" + index}
      >
        <div className="flex flex-col font-Silka-SemiBold  ml-5 w-[100%] mr-5">
          {question && renderQuestion()}
        </div>
      </motion.div>
    </div>
  );
}
