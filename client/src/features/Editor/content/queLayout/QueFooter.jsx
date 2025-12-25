import { motion } from "framer-motion";
import { ArrowsCounterClockwise, List, StarFour } from "@phosphor-icons/react";

export default function QueFooter({ values, updatePoints, updateRandomized }) {
  return (
    <motion.div className="mt-5 border-t-2 pt-5 pb-5 flex font-Satoshi-Bold">
      {updateRandomized && (
        <div className="flex flex-col text-[13px] mr-7 cursor-pointer">
          <p>Option's Order</p>
          <div
            onClick={() =>
              updateRandomized(values.randomizedOptions == 1 ? 0 : 1)
            }
            className="flex mt-2 relative gap-14 bg-[#F3F3F3] p-[6px] pl-3 pr-3 rounded-sm items-center"
          >
            {values.randomizedOptions ? (
              <>
                {" "}
                <p>Randomize order each time </p>
                <ArrowsCounterClockwise size={15} weight="bold" />
              </>
            ) : (
              <>
                <p>Keep in current order </p>
                <List size={16} weight="bold" />
              </>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col text-[13px]">
        <p>Mark as point</p>
        <div className="flex mt-2 bg-[#F3F3F3] p-[6px] pl-3 pr-3 rounded-sm items-center w-fit">
          <input
            type="number"
            value={String(values.points)}
            onChange={(e) => updatePoints(parseInt(e.target.value))}
            className="border-r-2 w-10 outline-none bg-transparent"
          />
          <div className="flex gap-4 items-center">
            <p className="ml-4">Points</p>
            <StarFour size={14} weight="bold" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
