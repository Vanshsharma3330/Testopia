import { useContext } from "react";
import { QuesContext } from "../context/quesContext";

export const useQues = () => {
  return useContext(QuesContext);
};
