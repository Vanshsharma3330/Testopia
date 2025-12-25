import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import RightBanner from "./components/rightBanner";
import { loginValidationSchema } from "../../schemas/auth";
import Input from "./components/input";
import { useLogin } from "./api/login";
import SimpleLoader from "../../shared/components/loaders/simpleLoader";
import GoogleLogin from "./googleLogin";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const Toast = useToast();
  const { setLoggedin, setUser } = useAuth();

  const { mutate: loginMutation, isPending } = useLogin({
    onSuccess: (data) => {
      if (data.success) {
        setUser({ name: data.name, email: data.email });
        setLoggedin(true);
        Toast(0, data.success, 3000);
        navigate("/");
      } else if (data.warning) {
        Toast(1, data.warning, 3000);
      } else if (data.error) {
        Toast(2, data.error, 3000);
      }
    },
    onError: (error) => {
      console.log("Error occurred:", error);
      Toast(2, data.success, 3000);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginMutation(values);
    },
  });

  return (
    <motion.div className="main-wrapper flex h-screen relative z-10">
      <div className="left-container bg-black w-1/2 flex items-center justify-center">
        <div className="min-h-[570px] min-w-[555px] bg-[#212121] flex flex-col items-center justify-center mx-auto my-auto p-8 rounded-2xl">
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-white font-Satoshi-Bold text-3xl mb-6">
              Welcome back
            </h1>
            <GoogleLogin label="Sign In with Google" isPending={isPending} />

            <h1 className=" text-white w-full mb-4">
              <span className="text-[#646464]">
                ------------------------------------{" "}
              </span>
              <span className="font-Satoshi-Medium">OR</span>
              <span className="text-[#646464]">
                {" "}
                ------------------------------------
              </span>
            </h1>

            <div className="flex flex-col gap-4 w-full mb-4">
              <Input
                disabled={isPending}
                readOnly={isPending}
                name={"email"}
                type="email"
                placeholder="E-mail address*"
                formik={formik}
              />
              <Input
                disabled={isPending}
                readOnly={isPending}
                name={"password"}
                type="password"
                placeholder="Password*"
                formik={formik}
              />
            </div>

            <motion.button
              type="submit"
              className="text-black disabled:cursor-not-allowed font-Satoshi-Bold text-md rounded-full w-full flex justify-center items-center bg-[#caef45] px-52 h-12 mb-4"
              disabled={isPending}
            >
              {isPending ? <SimpleLoader /> : "SIGN IN"}
            </motion.button>

            <h1 className="text-white mb-2">
              Don't have an account?
              {isPending ? (
                <span className="text-[#caef45] ml-1 cursor-not-allowed">
                  Register
                </span>
              ) : (
                <Link to="/register" className="text-[#caef45] ml-1">
                  Register
                </Link>
              )}
            </h1>
          </form>
        </div>
      </div>

      <RightBanner />
    </motion.div>
  );
}
