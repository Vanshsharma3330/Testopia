import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@phosphor-icons/react";

export default function VerifyUser() {
  const params = useParams();

  const [msg, setMsg] = useState({ title: "", subtitle: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (params.status === "success") {
      setMsg({
        title: "Verified",
        subtitle: "Email verified you may now leave this page",
      });
    } else if (params.status === "error") {
      setMsg({
        title: "Error",
        subtitle: "An Error Occured while verifying user.",
      });
    } else if (params.status === "verify") {
      setMsg({
        title: "Verify your email",
        subtitle:
          "Check your email inbox and verify your email to proceed. You may leave this page now.",
      });
    } else if (params.status === "expired") {
      setMsg({
        title: "Link Expired",
        subtitle: "The Link has expired kindly register again to verify.",
      });
    }
  });

  return (
    <>
      <div className="w-screen h-screen grid place-content-center bg-[#f3f3f3]">
        <div className="flex flex-col items-center bg-white rounded-xl shadow-xl p-10 py-16">
          <CheckCircle size={96} color="#12ae7c" weight="fill" />
          <h1 className="text-2xl font-Satoshi-Bold">{msg.title}</h1>
          <p className="font-Satoshi-Medium text-base ">{msg.subtitle}</p>
          <button
            className="bg-[#5a4bea] text-white mt-8 font-Satoshi-Bold p-2.5 px-4 text-base rounded-md"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
}
