import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Ipadimg from "../../../assets/img/ipad_display.png";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex flex-col w-full items-center justify-center text-center relative z-[10] max-h-screen"
        id="main"
      >
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative px-20 text-7xl/tight font-Satoshi-Bold mt-12"
        >
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/623d5980fbc033885da2c334_Highlight_05.svg"
            alt=""
            className="absolute left-14 -top-9 right-auto"
          />
          Build quizzes that{" "}
          <span className="font-Boska-BoldItalic">
            spark <br /> curiosity
          </span>{" "}
          and engagement
        </motion.h1>
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="font-Satoshi-Regular text-xl mt-10 max-w-xl leading-8"
        >
          Design unique quizzes and questions, share them with a vibrant
          community, and test your skills across a wide range of topics.
        </motion.h2>
        <img
          src="https://assets.website-files.com/623865af2eee366912508587/6241b2d41327941b39683db0_Peach%20Gradient%20Image%20(1)-p-500.png"
          className="absolute left-[-15vw] bottom-0"
          alt=""
        />
        <img
          src="https://assets.website-files.com/623865af2eee366912508587/6241b2d3e22f1763bfb3a480_Blue%20Gradient%20Image%20(2)-p-500.png"
          className="absolute left-[-15vw] bottom-[-18vh]"
          alt=""
        />

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-black flex items-center gap-3 text-white font-Satoshi-Bold uppercase rounded-full px-8 py-4 mt-10 ml-auto mr-auto"
          >
            Try it Now
            <ArrowUpRight size={24} />
          </button>
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/6241b2d41327941b39683db0_Peach%20Gradient%20Image%20(1)-p-500.png"
            className="absolute left-[-45vw] bottom-[8vh]"
            alt=""
          />
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/6241b2d3e22f1763bfb3a480_Blue%20Gradient%20Image%20(2)-p-500.png"
            className="absolute left-[-45vw] bottom-[-8vh]"
            alt=""
          />
          {/* <div className='logo-wrapper flex mt-10 gap-3'>
						<div className='flex gap-2'>
							<div className='flex flex-col items-center'>
								<img src="https://assets.website-files.com/623865af2eee366912508587/623cac6366ae86422aabe738_Apple%20Black.svg" alt="" />
								<p className='text-black text-opacity-70 font-Satoshi-Regular text-[10px] leading-8'>macOS,</p>
							</div>
							<div className='flex flex-col items-center'>
								<img src="https://assets.website-files.com/623865af2eee366912508587/623993f7fe05206ada3252f5_microsoft.svg" alt="" />
								<p className='text-black text-opacity-70 font-Satoshi-Regular text-[10px] leading-8'>WINDOWS,</p>
							</div>
							<div className='flex flex-col items-center'>
								<img src="https://assets.website-files.com/623865af2eee366912508587/623993f833d837c57c5950e4_linux.svg" alt="" />
								<p className='text-black text-opacity-70 font-Satoshi-Regular text-[10px] leading-8'>LINUX</p>
							</div>
						</div>

						<div className='w-px h-6 bg-gray-300 mx-4 mt-1'></div> */}

          {/* <div className='flex gap-2'>
							<div className='flex flex-col items-center'>
								<img src="https://assets.website-files.com/623865af2eee366912508587/623993f7fe0520e5de3252f4_chrome.svg" alt="" />
								<p className='text-black text-opacity-70 font-Satoshi-Regular text-[10px] leading-8'>CHROME,</p>
							</div>
							<div className='flex flex-col items-center'>
								<img src="https://assets.website-files.com/623865af2eee366912508587/623993f8e75c5b5708a61193_safari.svg" alt="" />
								<p className='text-black text-opacity-70 font-Satoshi-Regular text-[10px] leading-8'>SAFARI,</p>
							</div>
							<div className='flex flex-col items-center'>
								<img src="https://assets.website-files.com/623865af2eee366912508587/623993f77547cffa504179a5_firefox.svg" alt="" />
								<p className='text-black text-opacity-70 font-Satoshi-Regular text-[10px] leading-8'>& FIREFOX</p>
							</div>
						</div> */}
          {/* </div> */}
        </motion.div>
        <img
          src="https://assets.website-files.com/623865af2eee366912508587/6241b2d41327941b39683db0_Peach%20Gradient%20Image%20(1)-p-500.png"
          className="absolute h-[75%] right-[14vw] bottom-[-29vh] z-[-1]"
          alt=""
        />
      </div>
      <div className="flex items-center justify-center mt-10">
        <img
          src={Ipadimg}
          className="relative z-10 h-[71%] w-[71%] object-contain"
          alt=""
        />
      </div>
    </>
  );
}
