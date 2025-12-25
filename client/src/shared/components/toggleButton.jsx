import { motion } from "framer-motion";

export default function ToggleButton({ action, value }) {
  return (
    <div
      onClick={action}
      className={`flex w-[31.5px] cursor-pointer p-0.5 h-[17.5px] rounded-full items-center ${value ? "justify-end bg-[#14ae7f]" : "justify-start bg-[#cccccc]"}`}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
        className="w-1/2 h-full rounded-full bg-white"
      ></motion.div>
    </div>
  );
}
