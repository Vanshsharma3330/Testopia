import blueglowLogin from "../../../assets/img/blueglowLogin.png";
import greenGlowLogin from "../../../assets/img/greenGlowLogin.png";
import Pie from "../../../assets/img/pie.png";
import CreateQuiz from "../../../assets/img/createQuiz.png";
import Pin from "../../../assets/img/pin.png";

export default function RightBanner() {
  return (
    <div className="right-container bg-white w-1/2 h-full flex items-center overflow-hidden justify-center relative">
      <img
        src={greenGlowLogin}
        alt=""
        className="absolute no-drag right-[-350px] z-[2] bottom-[-302px] w-auto h-auto"
      />
      <img
        src="https://assets.website-files.com/623865af2eee366912508587/6241b2d41327941b39683db0_Peach%20Gradient%20Image%20(1)-p-800.png"
        alt=""
        className="absolute no-drag w-96 h-96 bottom-[19px] right-[100px] opacity-85 z-[1]"
      />

      <div className="z-50 relative w-3/4 flex flex-col px-12 gap-10">
        <div className="content flex gap-5">
          <img src={CreateQuiz} alt="" className="w-16 h-16 object-contain" />
          <div className="sub-content flex flex-col gap-1">
            <h1 className="font-Satoshi-Bold text-2xl">Create Your Quizzes</h1>
            <p className="font-Satoshi-Regular text-md/snug text-gray-800">
              Design custom quizzes with ease and upload them to share with
              others. Customize your quizzes with various question types to make
              them engaging.
            </p>
          </div>
        </div>
        <div className="content flex gap-5">
          <img
            src="https://assets.website-files.com/623865af2eee366912508587/62387f9ffc386a444ec10114_image%2070.png"
            alt=""
            className="w-16 h-16 object-contain"
          />
          <div className="sub-content flex flex-col gap-1">
            <h1 className="font-Satoshi-Bold text-2xl">Challenge Yourself</h1>
            <p className="font-Satoshi-Regular text-md/snug text-gray-800">
              Explore a wide range of quizzes crafted by the community and test
              your knowledge. Discover quizzes across diverse topics and levels.
            </p>
          </div>
        </div>
        <div className="content flex gap-5">
          <img src={Pie} alt="" className="w-14 h-14 object-contain" />
          <div className="sub-content flex flex-col gap-1">
            <h1 className="font-Satoshi-Bold text-2xl">Track Your Progress</h1>
            <p className="font-Satoshi-Regular text-md/snug text-gray-800">
              Monitor your performance with detailed stats and stay motivated to
              improve. Analyze your weaknesses to focus on areas that need
              attention.
            </p>
          </div>
        </div>
        <div className="content flex gap-5">
          <img src={Pin} alt="" className="w-14 h-14 object-contain" />
          <div className="sub-content flex flex-col gap-1">
            <h1 className="font-Satoshi-Bold text-2xl">Instant Results</h1>
            <p className="font-Satoshi-Regular text-md/snug text-gray-800">
              Receive quick and accurate results for every quiz you attempt,
              complete with feedback! Compare your scores with others and climb
              the leaderboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
