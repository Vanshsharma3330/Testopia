import { Outlet } from "react-router-dom";
import QuesProvider from "../context/quesContext";

export default function Admin() {
  return (
    <>
      <QuesProvider>
        <div className="flex w-[100%]">
          <Outlet />
        </div>
      </QuesProvider>
    </>
  );
}
