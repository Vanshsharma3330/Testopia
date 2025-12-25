import { motion } from "framer-motion";

const EarlyAccess = () => {
  return (
    <div className="flex items-center justify-center" id="joinus">
      <div className="bg-black rounded-xl w-[70%] text-white relative">
        <div className="absolute top-32 left-3/4">
          <img
            src="https://cdn.prod.website-files.com/623865af2eee366912508587/6239bbc8e75c5b9bfaa79197_Vector%2097.png"
            alt=""
          />
        </div>
        <div className="absolute top-[55px] left-[750px] h-72 w-72">
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/6241d295b23ac97b3872a90f_Green%20Oval%20Gradient%20(2)-p-1080.png"
            alt=""
          />
        </div>
        <div className="absolute top-[70px] left-[670px] h-72 w-72">
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/6241d294ad1a5b72d3002ff7_Blue%20Oval%20Gradient%20(2)-p-500.png"
            alt=""
          />
        </div>
        <div className="wrapper-early-access flex flex-col">
          <div className="mt-14 px-16">
            <h1 className="font-Satoshi-Bold text-5xl/tight">Join Us Now.</h1>
            <h1 className="font-Boska-BoldItalic text-5xl/tight mt-3 text-[#B3B3B3]">
              Make Quizzes effortlessly.
            </h1>
          </div>
          <div className="flex px-16 mt-14 gap-4">
            <button className="flex items-center justify-center bg-[#CAEF45] rounded-full py-5 px-8 gap-4">
              <h1 className="text-black font-Satoshi-Bold">TRY IT NOW</h1>
              <img
                src="https://cdn.prod.website-files.com/623865af2eee366912508587/6239795bd32e5368c4c57718_ArrowUpRight%20Black.svg"
                alt=""
              />
            </button>
            {/* <div className="flex text-[#B3B3B3] gap-1">
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://cdn.prod.website-files.com/623865af2eee366912508587/623993f7f316103b04e86f43_apple.svg"
                                    alt=""
                                />
                                <p className="text-opacity-70 font-Satoshi-Regular text-[10px] leading-8">
                                    macOS,
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://assets.website-files.com/623865af2eee366912508587/623993f7fe05206ada3252f5_microsoft.svg"
                                    alt=""
                                />
                                <p className="text-opacity-70 font-Satoshi-Regular text-[10px] leading-8">
                                    WINDOWS,
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://assets.website-files.com/623865af2eee366912508587/623993f833d837c57c5950e4_linux.svg"
                                    alt=""
                                />
                                <p className="text-opacity-70 font-Satoshi-Regular text-[10px] leading-8">
                                    LINUX
                                </p>
                            </div>
                        </div> */}
            {/* 
                        <div className="w-px h-6 bg-gray-300 mx-1 mt-1"></div>

                        <div className="flex gap-2 text-[#B3B3B3]">
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://assets.website-files.com/623865af2eee366912508587/623993f7fe0520e5de3252f4_chrome.svg"
                                    alt=""
                                />
                                <p className="text-opacity-70 font-Satoshi-Regular text-[10px] leading-8">
                                    CHROME,
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://assets.website-files.com/623865af2eee366912508587/623993f8e75c5b5708a61193_safari.svg"
                                    alt=""
                                />
                                <p className="text-opacity-70 font-Satoshi-Regular text-[10px] leading-8">
                                    SAFARI,
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://assets.website-files.com/623865af2eee366912508587/623993f77547cffa504179a5_firefox.svg"
                                    alt=""
                                />
                                <p className="text-opacity-70 font-Satoshi-Regular text-[10px] leading-8">
                                    & FIREFOX
                                </p>
                            </div>
                        </div> */}
          </div>
          <div className="relative overflow-hidden mt-14 mb-20">
            <motion.div
              className="flex"
              animate={{
                x: [0, "-100%"],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
            >
              {/* Create multiple sets of marquee items */}
              {[...Array(50)].map((_, index) => (
                <div key={index} className="flex shrink-0">
                  <MarqueeItems />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MarqueeItems = () => (
  <>
    <div className="flex bg-[#212121] rounded-full py-4 px-6 gap-2 items-center justify-center mr-10">
      <h1 className="font-Satoshi-Regular text-lg whitespace-nowrap">
        No limits on creativity
      </h1>
    </div>
    <div className="flex bg-[#212121] rounded-full py-4 px-6 gap-2 items-center justify-center mr-10">
      <h1 className="font-Satoshi-Regular text-lg whitespace-nowrap">
        Secure sharing.
      </h1>
    </div>
    <div className="flex bg-[#212121] rounded-full py-4 px-6 gap-2 items-center justify-center mr-10">
      <h1 className="font-Satoshi-Regular text-lg whitespace-nowrap">
        Access for everyone on your team.
      </h1>
    </div>
    <div className="flex bg-[#212121] rounded-full py-4 px-6 gap-2 items-center justify-center mr-10">
      <h1 className="font-Satoshi-Regular text-lg whitespace-nowrap">
        Manage and maintain your quizzes.
      </h1>
    </div>
  </>
);

export default EarlyAccess;
