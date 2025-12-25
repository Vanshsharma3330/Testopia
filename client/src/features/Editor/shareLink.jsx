import { Check, CopySimple, Info, X } from "@phosphor-icons/react";
import React, { useState } from "react";

const ShareLink = ({ url, setSharePopup }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard
      .writeText(url)
      .then(
        setTimeout(() => {
          setCopied(false);
        }, 1000),
      )
      .catch((err) => console.log("failed to copy url", err));
  };

  return (
    <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md bg-white border-[1.2px] p-4 pb-5 flex flex-col w-[400px] text-black">
      <div className="share-header flex items-center justify-between w-full">
        <h1 className="font-Satoshi-Bold text-md">Share Link</h1>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setSharePopup(false)}
        >
          <X size={16} weight="bold" />
        </button>
      </div>
      <div className="flex items-center justify-start gap-2 mt-5">
        <input
          readOnly
          type="url"
          value={url}
          className="outline-white bg-[#f3f3f3] text-sm font-Satoshi-Medium w-[90%] 
                    p-1.5 rounded-md pl-3"
        />
        <div
          className="bg-[#f3f3f3] p-2 cursor-pointer rounded-md"
          onClick={handleCopyLink}
        >
          {copied ? <Check size={18} /> : <CopySimple size={18} />}
        </div>
      </div>
      <div className="flex items-start space-x-2 mt-4 text-xs text-gray-600">
        <Info size={16} weight="bold" />
        <p className="font-Satoshi-Bold text-gray-600 text-xs">
          Anyone with this url can attempt this quiz.
        </p>
      </div>
    </div>
  );
};

export default ShareLink;
