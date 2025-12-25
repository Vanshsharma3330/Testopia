import { motion } from "framer-motion";
import Backdrop from "./backdrop";

export default function Popup({ action, children }) {
  return (
    <Backdrop action={action} bg="rgb(255 255 255 / 80%)" position="center">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "circInOut", duration: 0.2 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative z-50 p-6 font-Silka-Bold"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}
