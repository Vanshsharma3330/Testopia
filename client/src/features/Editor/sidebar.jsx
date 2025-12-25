import { AnimatePresence } from "framer-motion";
import { useQues } from "../../hooks/useQues";
import Backdrop from "../../shared/components/backdrop";
import RenderQueType from "../../shared/components/renderQueType";
import { Plus, Trash } from "@phosphor-icons/react";
import SelectQueBar from "./content/selectQueBar";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

export const scrolltoQue = (index) => {
  const content = document.getElementById("content");
  const que = content.querySelector("#que" + index);
  que.scrollIntoView({ behavior: "smooth" });
};

export default function Sidebar() {
  const { ques, selectedQue } = useQues();

  const [showTypes, setShowTypes] = useState(false);

  return (
    <>
      <div className="text-sm flex justify-between items-center font-bold w-full pt-4 pb-2 top-0 bg-[#f7f7f6]">
        <p className="text-[#868788]">Question({ques.length})</p>
        <button
          className="bg-white p-1 border-[1px] rounded-full"
          onClick={() => setShowTypes(!showTypes)}
        >
          <motion.div animate={showTypes ? { rotate: 45 } : { rotate: 0 }}>
            <Plus size={14} weight="bold" />
          </motion.div>
          <AnimatePresence>
            {showTypes && (
              <Backdrop action={() => setShowTypes(false)}>
                {" "}
                <SelectQueBar
                  setShowTypes={setShowTypes}
                  actionType="add"
                  position="bottomleft"
                />
              </Backdrop>
            )}
          </AnimatePresence>
        </button>
      </div>
      <div className="w-[100%] no-scrollbar h-[90%] overflow-auto pt-2 font-Satoshi-Bold">
        {ques.map((q, i) => {
          return (
            <SidebarItem
              key={i}
              q={q}
              i={i}
              selectedQue={selectedQue}
              scrolltoQue={scrolltoQue}
            />
          );
        })}
      </div>
    </>
  );
}

//this is the question navigation bar for admin
//it will automatically scroll to the page when selectedQue handleChanges
//it will utilise useInView framer motion to know if its in view
export function SidebarItem({ q, i, selectedQue }) {
  const ref = useRef(null);
  const { deleteQue } = useQues();
  const isInView = useInView(ref, { threshold: 0.2 });

  useEffect(() => {
    if (!isInView && selectedQue == i + 1) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedQue]);

  return (
    <div
      ref={ref}
      key={i}
      className={`border-[#DDDDDD] border-2 p-2 rounded-lg cursor-pointer mb-4 ${selectedQue == i ? "bg-[#f2f1fd] !border-[#aea2e7]" : ""}`}
      onClick={() => {
        scrolltoQue(i);
        e.stopPropagation();
      }}
    >
      <div className="flex cursor-pointer items-center">
        <p className="font-Silka-Bold text-sm bg-[#d6d8db] w-4 h-4 rounded-lg">
          {i + 1}.
        </p>

        <h4 className="ml-2 text-sm">
          {q.que?.length > 18
            ? q.que.substring(0, 18) + "..."
            : q.que.length == 0
              ? "..."
              : q.que}
        </h4>

        <button className="ml-auto" onClick={() => deleteQue(i)}>
          <Trash size={16} weight="bold" />
        </button>
      </div>
      <div className="flex bg-[#EBEBEB] p-[4px] mt-3 rounded-full text-xs items-center w-fit">
        <p className="text-xs pl-1 pr-1 flex items-center gap-1">
          <RenderQueType iconsize={13} type={q.type} />
        </p>
      </div>
    </div>
  );
}
