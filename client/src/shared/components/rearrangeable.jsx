import { DotsSixVertical, Trash } from "@phosphor-icons/react";
import { Reorder, motion, useDragControls } from "framer-motion";
import { AnimatePresence } from "framer-motion";

//Renders group where rearrangeable items will be rendered
//Animate resence also to animate exit and entering animations
export function RearrangeableGroup({ children, values, onReorder }) {
  return (
    <Reorder.Group axis="y" values={values} onReorder={onReorder}>
      <AnimatePresence>{children}</AnimatePresence>
    </Reorder.Group>
  );
}

//renders item which are rearrangeable
//also renders delete and rearrange button with taking logic from above compoentn and also rendering its components
export function RearrangeableItem({ i, value, remove, children }) {
  const controls = useDragControls();

  return (
    <Reorder.Item dragListener={false} dragControls={controls} value={value}>
      <div className="flex gap-3 w-full" id={value.id}>
        {/* render components of child */}
        {children}

        {/* rearrange button */}
        <button>
          <div
            className="bg-[#F3F3F3] p-[7.5px] no-drag reorder-handle cursor-grab"
            onPointerDown={(e) => controls.start(e)}
          >
            <DotsSixVertical size={16} weight="bold" />
          </div>
        </button>

        {/* delete button */}
        {remove ? (
          <button>
            <div className="bg-[#F3F3F3] p-[7.5px]" onClick={() => remove(i)}>
              <Trash size={16} />
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
    </Reorder.Item>
  );
}
