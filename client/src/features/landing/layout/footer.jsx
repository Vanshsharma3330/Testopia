import Logo from "/logo.svg";

export default function Footer() {
  return (
    <div
      id="footer"
      className="flex flex-col gap-8 lg:flex-row items-start justify-center lg:gap-28 p-6 md:p-16 lg:p-36"
    >
      {/* Logo and Description */}
      <div className="box1 flex flex-col gap-4 items-start justify-center w-full lg:w-[23%]">
        <div className="flex gap-4 items-center justify-start">
          <div className="h-8 w-8">
            <img src={Logo} alt="" className="object-contain" />
          </div>
          <h1 className="font-Satoshi-Bold leading-none text-3xl lg:text-4xl">
            Testopia
          </h1>
        </div>
        <h2 className="font-Satoshi-Regular text-sm lg:text-md">
          Empowering creativity, connecting minds, and transforming the way
          quizzes are shared and experienced.
        </h2>
      </div>

      {/* Navigation Links - Always side by side */}
      <div className="flex gap-8 md:gap-16 lg:gap-20 w-full lg:w-auto">
        {/* Pages */}
        <div className="box2 flex flex-col items-start flex-1 lg:flex-none">
          <div className="w-full">
            <h1 className="font-Satoshi-Bold text-sm lg:text-base">PAGES</h1>
          </div>
          <div className="w-full mt-4 lg:mt-[52px]">
            <ul className="font-Satoshi-Regular space-y-3 lg:space-y-4 text-sm lg:text-base">
              <li className="cursor-pointer hover:text-gray-600">Homepage</li>
              <li className="cursor-pointer hover:text-gray-600">About</li>
              <li className="cursor-pointer hover:text-gray-600">Pricing</li>
              <li className="cursor-pointer hover:text-gray-600">Features</li>
              <li className="cursor-pointer hover:text-gray-600">
                Integration
              </li>
              <li className="cursor-pointer hover:text-gray-600">Blog</li>
              <li className="cursor-pointer hover:text-gray-600">
                Blog Details
              </li>
              <li className="cursor-pointer hover:text-gray-600">Contact</li>
            </ul>
          </div>
        </div>

        {/* Utility Pages */}
        <div className="box3 flex flex-col items-start flex-1 lg:flex-none">
          <div className="w-full">
            <h1 className="font-Satoshi-Bold text-sm lg:text-base">
              UTILITY PAGES
            </h1>
          </div>
          <div className="w-full mt-4 lg:mt-[52px]">
            <ul className="font-Satoshi-Regular space-y-3 lg:space-y-4 text-sm lg:text-base">
              <li className="cursor-pointer hover:text-gray-600">
                Style Guide
              </li>
              <li className="cursor-pointer hover:text-gray-600">Licenses</li>
              <li className="cursor-pointer hover:text-gray-600">
                404 Not Found
              </li>
              <li className="cursor-pointer hover:text-gray-600">Changelog</li>
              <li className="cursor-pointer hover:text-gray-600">Log In</li>
              <li className="cursor-pointer hover:text-gray-600">Register</li>
              <li className="cursor-pointer hover:text-gray-600">Pricing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="box4 flex flex-col gap-6 lg:gap-12 w-full lg:w-auto">
        <div>
          <h1 className="font-Satoshi-Bold text-sm lg:text-base">
            SUBSCRIBE TO OUR NEWSLETTER
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your e-mail"
              className="bg-[#f4f4f4] font-Satoshi-Regular rounded-full py-3 lg:py-4 px-4 placeholder-[#888888] w-full lg:w-auto text-sm lg:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
