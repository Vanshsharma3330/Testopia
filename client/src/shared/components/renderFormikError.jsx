import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { motion } from "framer-motion";

export default function RenderFormikError({ field, formik, position, style }) {
  return formik.touched[field] &&
    formik.errors[field] &&
    formik.errors[field] !== "required" ? (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      transition={{ type: "spring", duration: 0.2 }}
      className={`flex items-center bg-slate-100 absolute p-0.5 rounded-sm w-fit mt-1 ${position == "end" ? "mr-0" : ""} ${style}`}
    >
      <BsFillExclamationDiamondFill fill="red" size={14} />
      <p className="text-red-500 text-[13px] ml-[7px]">
        {formik.errors[field]}
      </p>
    </motion.div>
  ) : null;
}
