import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[100vh] overflow-hidden items-center justify-between p-20 w-[88%]">
      <div className="absolute left-[600px] bottom-[-170px] w-[240px] h-[252px] rounded-full bg-[#24e77d] opacity-60 blur-80"></div>
      <div className="absolute left-[380px] bottom-[-150px] w-[240px] h-[252px] rounded-full bg-[#fff2c2] opacity-60 blur-80"></div>
      <div className="absolute left-[780px] bottom-[-120px] w-[240px] h-[252px] rounded-full bg-[#75eaf1] opacity-60 blur-80"></div>
      <div>
        <img
          src="https://assets.website-files.com/623865af2eee366912508587/623893119c33c626754e1d8c_clumsy%201.svg"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-Boska-BoldItalic text-[200px]">404</h1>
        <h1 className="font-Satoshi-Bold text-[40px] -mt-8">Page Not Found</h1>
        <button
          className="flex items-center justify-center gap-4 rounded-full bg-black py-4 px-14 mt-14"
          onClick={() => navigate("/")}
        >
          <h1 className="text-white font-Satoshi-Medium text-xl">
            GO BACK TO HOME
          </h1>
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/6238747d9d3f5e4e5097b087_ArrowUpRight.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
