import React from "react";
import { motion } from "framer-motion";
import Pie from "../../../assets/img/pie.png";
import CreateQuiz from "../../../assets/img/createQuiz.png";

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex justify-center mt-10 py-20 relative px-4 sm:px-6 lg:px-8"
      id="features"
    >
      <div className="absolute z-[-999] top-[200px] bottom-10 left-[300px] hidden lg:block">
        <img
          src="https://assets.website-files.com/623865af2eee366912508587/6241b2d3e22f1763bfb3a480_Blue%20Gradient%20Image%20(2)-p-500.png"
          alt=""
          className=""
        />
      </div>
      <div className="absolute z-[-999] top-50 left-420 hidden lg:block">
        <img
          src="https://assets.website-files.com/623865af2eee366912508587/6241b2d41327941b39683db0_Peach%20Gradient%20Image%20(1)-p-800.png"
          alt=""
        />
      </div>

      <div className="w-full lg:w-9/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="col-span-1 md:col-span-2 bg-black flex flex-col gap-6 text-white rounded-3xl py-8 px-6 lg:px-10">
          <div>
            <p className="font-Satoshi-Bold text-3xl lg:text-5xl">
              Engage and excel
            </p>
            <span className="font-Boska-BoldItalic text-white text-3xl lg:text-5xl text-opacity-70 leading-snug">
              with Testopia.
            </span>
          </div>
          <p className="text-opacity-70 text-white font-Satoshi-Regular w-full lg:w-[80%] text-base lg:text-lg">
            Beyond that, Testopia simplifies everything, from creating
            captivating quizzes to tracking scores and sharing them effortlessly
            with the world.
          </p>
        </div>

        <div
          className="rounded-3xl flex flex-col items-start gap-4 p-6 lg:p-8 lg:py-10 bg-white"
          style={{
            boxShadow: "0 13px 100px 0 hsla(0, 0%, 78%, 0.25)",
          }}
        >
          <img src={CreateQuiz} alt="" className="w-12 h-12 lg:w-16 lg:h-16" />
          <h1 className="font-Satoshi-Bold text-2xl lg:text-[30px]/tight mt-2 lg:mt-4">
            Create Quizzes
          </h1>
          <p className="font-Satoshi-Regular text-black text-base lg:text-lg/normal">
            Design quizzes with various question types, including
            multiple-choice, fill-in-the-blank, and one-word answers.
          </p>
        </div>

        <div
          className="rounded-3xl flex flex-col items-start gap-4 p-6 lg:p-8 lg:py-10 bg-white"
          style={{
            boxShadow: "0 13px 100px 0 hsla(0, 0%, 78%, 0.25)",
          }}
        >
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/62387f9ffc386a444ec10114_image%2070.png"
            alt=""
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
          <h1 className="font-Satoshi-Bold text-2xl lg:text-[30px]/tight mt-2 lg:mt-4">
            Leaderboard
          </h1>
          <p className="font-Satoshi-Regular text-black text-base lg:text-lg/normal">
            Track your progress and compete with others. Climb the leaderboard
            and showcase your knowledge.
          </p>
        </div>

        <div
          className="rounded-3xl flex flex-col items-start gap-4 p-6 lg:p-8 lg:py-10 bg-white"
          style={{
            boxShadow: "0 13px 100px 0 hsla(0, 0%, 78%, 0.25)",
          }}
        >
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/623c977a2a8f363f724cb8e1_image%2039.png"
            alt=""
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
          <h1 className="font-Satoshi-Bold text-2xl lg:text-[30px]/tight mt-2 lg:mt-4">
            Community Hub
          </h1>
          <p className="font-Satoshi-Regular text-black text-base lg:text-lg/normal">
            Join discussions, share tips, and connect with quiz enthusiasts to
            expand your knowledge.
          </p>
        </div>

        <div
          className="rounded-3xl flex flex-col items-start gap-4 p-6 lg:p-8 lg:py-10 bg-white"
          style={{
            boxShadow: "0 13px 100px 0 hsla(0, 0%, 78%, 0.25)",
          }}
        >
          <img src={Pie} alt="" className="w-12 h-12 lg:w-16 lg:h-16" />
          <h1 className="font-Satoshi-Bold text-2xl lg:text-[30px]/tight mt-2 lg:mt-4">
            Progress Tracking
          </h1>
          <p className="font-Satoshi-Regular text-black text-base lg:text-lg/normal">
            Monitor your performance with detailed stats and stay motivated to
            improve.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
