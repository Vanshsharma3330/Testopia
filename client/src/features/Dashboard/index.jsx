import Sidebar from "./Sidebar";
import { useState } from "react";
import { createContext } from "react";

export const WorkspaceContext = createContext();

export default function Dashboard({ children }) {
  const [selectedworkspace, setselectedWorkspace] = useState({});

  return (
    <WorkspaceContext.Provider
      value={{ selectedworkspace, setselectedWorkspace }}
    >
      <div className="flex flex-col w-[100vw] font-Satoshi-Medium bg-white">
        <div className="flex  min-h-screen h-auto items-start">
          {/* Sidebar */}
          <div className="h-full bg-[#F7F7F6] w-[20%] border-r-[1.5px] border-[#DDDDDD]">
            <Sidebar />
          </div>

          <div className="w-[80%] p-10 pt-5">{children}</div>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
}
