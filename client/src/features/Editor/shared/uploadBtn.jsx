import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useQues } from "../../../hooks/useQues";
import { useToast } from "../../../hooks/useToast";
import { Images, Plus } from "@phosphor-icons/react";
import SimpleLoader from "../../../shared/components/loaders/simpleLoader";

export default function UploadButton({ formik, imagePreview, index }) {
  const { user } = useAuth();
  const { quiz } = useQues();
  const Toast = useToast();

  const imageInputRef = useRef(null);

  const { mutate: uploadQuizImage, isPending: uploadPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `http://localhost:5000/quiz/ques/uploadImage?creator=${user.email}&workspace_id=${quiz.workspace}&quizId=${quiz._id}&queId=${index}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        console.log("Image uploaded successfully:", data.url);
        console.log(imagePreview.current);
        formik.setFieldValue("imageUrl", data.url);
      }
    },
    onError: (error) => {
      console.error("Error uploading image:", error);
    },
  });

  const handleImageUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        const validFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!validFormats.includes(file.type)) {
          Toast(
            2,
            "Invalid file format. Please upload a jpg, png, or webp image.",
            5000,
          );
          return;
        }
        imagePreview.current = URL.createObjectURL(file);
        const formData = new FormData();
        formData.append("queImage", file);
        uploadQuizImage(formData);
      }
    },
    [uploadQuizImage],
  );

  return (
    <>
      <input
        type="file"
        name="quizthumbnail"
        ref={imageInputRef}
        onChange={handleImageUpload}
        hidden
        accept="image/*"
      />
      <button
        type="button"
        onClick={() => imageInputRef.current.click()}
        className="font-Satoshi-Bold p-1 rounded-md text-xs bg-[#f3f3f3] px-2 flex items-center gap-1"
        disabled={uploadPending}
      >
        {uploadPending ? (
          <SimpleLoader />
        ) : imagePreview ? (
          <Images size={16} />
        ) : (
          <Plus size={12} weight="bold" />
        )}
        {imagePreview.current ? "Update" : "Add"} Image
      </button>
    </>
  );
}
