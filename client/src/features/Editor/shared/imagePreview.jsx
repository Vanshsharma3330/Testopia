import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { useQues } from "../../../hooks/useQues";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Popup from "../../../shared/components/popup";
import { AnimatePresence } from "framer-motion";
import SimpleLoader from "../../../shared/components/loaders/simpleLoader";
import { ArrowsOutSimple, Trash } from "@phosphor-icons/react";

export default function ImagePreview({ formik, imagePreview, index }) {
  const [showFullImage, setShowFullImage] = useState(false);

  const { user } = useAuth();
  const { quiz } = useQues();

  const { mutate: deleteQuizImage, isPending: deletePending } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `http://localhost:5000/quiz/ques/deleteImage?creator=${user.email}&workspace_id=${quiz.workspace}&quizId=${quiz._id}&queId=${index}`,
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        console.log("Image deleted successfully");

        formik.setFieldValue("imageUrl", "");
        imagePreview.current = "";
      }
    },
    onError: (error) => {
      console.error("Error deleting image:", error);
    },
  });

  return (
    <>
      {
        // ${uploadPending ? 'opacity-50' : 'opacity-100'}}
      }
      <div
        className={`w-1/2 mt-3 relative z-10 h-40 mb-5 rounded-tl-xl rounded-tr-xl bg-contain bg-no-repeat bg-[#f3f3f3] bg-center transition-opacity duration-300`}
        style={{ backgroundImage: `url('${imagePreview.current}')` }}
      >
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            type="button"
            onClick={() => setShowFullImage(true)}
            className="bg-white p-1 rounded-full disabled:opacity-50"
            // disabled={uploadPending}
          >
            <ArrowsOutSimple size={16} color="#5a4bea" />
          </button>
          <button
            type="button"
            onClick={() => deleteQuizImage()}
            className="bg-white p-1 rounded-full disabled:opacity-50"
            disabled={deletePending}
          >
            {deletePending ? <SimpleLoader /> : <Trash size={16} color="red" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showFullImage && (
          <Popup action={() => setShowFullImage(false)}>
            <img
              src={imagePreview.current}
              alt="Full size preview"
              className="mx-auto max-w-[80%] object-contain"
            />
          </Popup>
        )}
      </AnimatePresence>
    </>
  );
}
