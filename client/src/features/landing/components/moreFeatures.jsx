import React from "react";
import SideLeftImg from "../../../assets/img/side-left-img.svg";
import SideRightImg from "../../../assets/img/side-right-img.svg";
import { motion } from "framer-motion";

export default function MoreFeatures() {
  return (
    <>
      {/* First Section */}
      <div
        className="flex flex-col lg:flex-row items-center gap-6 p-4 md:p-8 lg:p-32 py-8 lg:py-16"
        id="morefeatures"
      >
        {/* Left Side (Image) */}
        <div className="w-full lg:w-6/12 order-2 lg:order-1">
          <img src={SideLeftImg} alt="" className="w-full" />
        </div>

        {/* Right Side (Content) */}
        <div className="w-full lg:w-6/12 flex flex-col font-Satoshi-Medium gap-6 lg:gap-10 px-2 lg:px-5 order-1 lg:order-2">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-6xl/tight font-Satoshi-Bold"
          >
            Manage{" "}
            <span className="font-Boska-BoldItalic">all your quizzes </span>
            at one place
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-Satoshi-Regular text-base md:text-lg lg:text-xl"
          >
            Attempt and make custom Quizzes, and get comprehensive insights on
            your dashboards. Connect with people around the globe.
          </motion.p>
          <div className="flex flex-col gap-4 lg:gap-5">
            <motion.div
              className="flex text-base md:text-lg lg:text-xl gap-3 lg:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src="https://assets.website-files.com/623865af2eee366912508587/623b3326fcec4a5beb0c1e51_CheckCircle.svg"
                alt=""
                className="w-6 h-6"
              />
              <p>Join discussions, share tips.</p>
            </motion.div>
            <motion.div
              className="flex text-base md:text-lg lg:text-xl gap-3 lg:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <img
                src="https://assets.website-files.com/623865af2eee366912508587/623b3326fcec4a5beb0c1e51_CheckCircle.svg"
                alt=""
                className="w-6 h-6"
              />
              <p>Unlock premium quizzes.</p>
            </motion.div>
            <motion.div
              className="flex text-base md:text-lg lg:text-xl gap-3 lg:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://assets.website-files.com/623865af2eee366912508587/623b3326fcec4a5beb0c1e51_CheckCircle.svg"
                alt=""
                className="w-6 h-6"
              />
              <p>Track your progress and compete with others.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row items-center gap-6 p-4 md:p-8 lg:p-32 py-8 lg:py-16">
        {/* Left Side (Content) */}
        <div className="flex flex-col w-full lg:w-6/12 gap-6 lg:gap-10 px-2 lg:px-5">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-Satoshi-Bold text-3xl md:text-4xl lg:text-6xl/tight"
          >
            Create quizzes,{" "}
            <span className="font-Boska-BoldItalic">
              effortlessly, anytime, anywhere{" "}
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 lg:gap-5"
          >
            <motion.p
              className="font-Satoshi-Regular text-base md:text-lg lg:text-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Design and share quizzes with ease, in any format, without limits,
              and get instant feedback in real-time. Making learning fun and
              interactive has never been simpler.
            </motion.p>
            <motion.p
              className="font-Satoshi-Regular text-base md:text-lg lg:text-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Stay ahead of deadlines and boost engagement with automated
              reminders, detailed analytics, and seamless collaboration
              features.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 lg:gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://assets.website-files.com/623865af2eee366912508587/6238747d9d3f5e4e5097b087_ArrowUpRight.svg"
              alt=""
              className="h-4 w-4 lg:h-5 lg:w-5 bg-black p-0.5 rounded-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.p
              className="font-Satoshi-Bold text-sm lg:text-base"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              LEARN MORE
            </motion.p>
          </motion.div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full lg:w-6/12">
          <img src={SideRightImg} alt="" className="w-full" />
        </div>
      </div>
    </>
  );
}
