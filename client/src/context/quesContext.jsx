import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

export const QuesContext = createContext();

export default function QuesProvider({ children }) {
  const [quiz, setQuiz] = useState();
  const [ques, setQues] = useState([]);
  const [selectedQue, setSelectedQue] = useState(1);
  const [isUserSelect, setisUserSelect] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [saveDebounce, cancelSaveDebounce] = useDebounce(
    async (questions, quizId) => {
      updateQuiz({ quizId: quiz._id, updates: { questions: questions } });
    },
    1000,
  );

  const { mutate: updateQuiz, isPending: updatingQuiz } = useMutation({
    mutationFn: async ({ quizId, updates }) => {
      await axios
        .post("http://localhost:5000/quiz/ques/update", {
          id: quizId,
          updated: { ...updates },
        })
        .then((res) => {});
    },
  });

  const updateQuesContext = useCallback(
    (edited, index) => {
      cancelSaveDebounce();

      setQues((prev) => {
        const updated = [...prev];

        console.log(quiz._id);
        updated[index] = edited;
        saveDebounce(updated);
        return updated;
      });
    },
    [quiz, saveDebounce, cancelSaveDebounce, setQues],
  );

  const deleteQue = useCallback(
    (index) => {
      cancelSaveDebounce();

      setQues((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        saveDebounce(updated, "");
        return updated;
      });
    },
    [setQues],
  );

  return (
    <QuesContext.Provider
      value={{
        quiz,
        setQuiz,
        ques,
        deleteQue,
        setQues,
        selectedQue,
        setSelectedQue,
        updateQuesContext,
        isUserSelect,
        setisUserSelect,
        updateQuiz,
        updatingQuiz,
      }}
    >
      {children}
    </QuesContext.Provider>
  );
}
