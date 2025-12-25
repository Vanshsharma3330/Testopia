import { useRef, useState, useCallback } from "react";
import RenderQueType from "../../../../shared/components/renderQueType";
import {
  CaretDown,
  Images,
  Trash,
  ArrowsOutSimple,
  Plus,
} from "@phosphor-icons/react";
import { AnimatePresence } from "framer-motion";
import Backdrop from "../../../../shared/components/backdrop";
import SelectQueBar from "../selectQueBar";
import { motion } from "framer-motion";
import ToggleButton from "../../../../shared/components/toggleButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../../hooks/useAuth";
import { useQues } from "../../../../hooks/useQues";
import Popup from "../../../../shared/components/popup";
import SimpleLoader from "../../../../shared/components/loaders/simpleLoader";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useToast } from "../../../../hooks/useToast";
import UploadButton from "../../shared/uploadBtn";
import ImagePreview from "../../shared/imagePreview";

export default function QueHeader({ formik, index }) {
  const [showTypes, setShowTypes] = useState(false);

  const imagePreview = useRef(formik.values.imageUrl || "");

  return (
    <>
      <div className="flex relative justify-between pt-4 font-base font-Satoshi-Bold pb-4 border-b-[1.5px]">
        <div
          onClick={() => {
            setShowTypes(!showTypes);
          }}
          className="flex bg-[#F3F3F3] p-2 gap-5 pl-3 h-7 pr-3 rounded-sm items-center cursor-pointer"
        >
          <div className="text-[12px] flex gap-2">
            <RenderQueType iconsize={17} type={formik.values.type} />
          </div>
          <motion.div animate={showTypes ? { rotate: 180 } : { rotate: 0 }}>
            <CaretDown size={11} weight="bold" />
          </motion.div>
        </div>

        <div className="flex gap-5">
          <UploadButton
            formik={formik}
            imagePreview={imagePreview}
            index={index}
          />

          <div className="font-Satoshi-Medium text-sm flex gap-2 items-center">
            <ToggleButton
              action={() =>
                formik.setFieldValue("required", !formik.values.required)
              }
              value={formik.values.required}
            />
            Required
          </div>
        </div>

        <AnimatePresence>
          {showTypes && (
            <Backdrop action={() => setShowTypes(false)}>
              <SelectQueBar
                setShowTypes={setShowTypes}
                actionType="replace"
                index={index}
                position="top"
              />
            </Backdrop>
          )}
        </AnimatePresence>
      </div>

      {imagePreview.current && (
        <ImagePreview
          formik={formik}
          imagePreview={imagePreview}
          index={index}
        />
      )}
    </>
  );
}
