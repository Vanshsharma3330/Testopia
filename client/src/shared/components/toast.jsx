/**
 * The `Toast` function in JavaScript React displays a toast notification with different icons and
 * messages based on the status provided.
 * @returns The `Toast` component is being returned. It is a functional component that displays a toast
 * message with different icons based on the `status` prop. The toast message content is determined by
 * the `msg` prop. The toast can be dismissed by clicking on a cross icon button. The toast also has an
 * animation effect when it appears and disappears.
 */

import { motion } from "framer-motion";
import checkmark from "../../assets/img/checkmark.svg";
import cross from "../../assets/img/cross.svg";
import crosscircle from "../../assets/img/cross-circle.svg";
import threat from "../../assets/img/threat.svg";
import info from "../../assets/img/info.svg";

export default function Toast({ status, msg, setToast }) {
  return (
    <>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        transition={{ duration: 0.8, ease: "backInOut" }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className={`${status == 0 ? "border-l-[#CAEF45]" : status == 1 ? "border-l-[#F0C521]" : status == 2 ? "border-l-[#EF4335]" : "border-l-[#41A3E2]"} flex z-40 p-2 bg-white w-[320px] h-[50px] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] fixed bottom-7 right-7 text-black border-l-8 items-center`}
      >
        <img
          src={
            status == 0
              ? checkmark
              : status == 1
                ? crosscircle
                : status == 2
                  ? threat
                  : info
          }
          alt=""
        />
        <p className="ml-2 font-Satoshi-Medium">{msg}</p>
        <button
          className="absolute right-2 top-1 cursor-pointer z-50"
          onClick={() => setToast(null)}
        >
          <img src={cross} alt="crossmark" />
        </button>
      </motion.div>
    </>
  );
}
