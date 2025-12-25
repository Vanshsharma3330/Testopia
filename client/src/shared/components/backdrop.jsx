/**
 * <summary>
 * The Backdrop component in JavaScript React creates a translucent overlay that can contain other
 * elements and responds to user interaction.
 * </summary>
 */
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import { motion } from "framer-motion";

//keep parent relative to show element relative to its parent
//else provide position
export default function Backdrop({ action, bg, position, children }) {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const backdropElement = document.querySelector("#backdrop");
    if (backdropElement) {
      position
        ? setContainer(backdropElement)
        : setContainer(backdropElement.parentElement);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: bg }}
      className={`w-screen h-screen cursor-default fixed inset-0 top-0 left-0 z-40 ${position == "center" ? "grid place-content-center" : ""}`}
      onClick={(e) => {
        action();
        e.stopPropagation();
      }}
      id="backdrop"
    >
      {container && createPortal(children, container)}
    </motion.div>
  );
}
