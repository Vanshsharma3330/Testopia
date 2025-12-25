import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import User from "../../../shared/components/user";
import Logo from "../../../assets/img/logo.svg";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { loggedin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const menuVariants = {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="py-4 md:py-6 lg:py-8 px-4 md:px-8 lg:px-28 flex justify-between md:justify-around items-center font-Satoshi-Regular">
          {/* Logo */}
          <a href="" className="items-center flex gap-3">
            <img src={Logo} className="w-6 h-6" alt="" />
            <p className="font-Satoshi-Bold text-2xl md:text-3xl">Testopia</p>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 lg:gap-10 text-md">
            <li className="hover:text-gray-600 cursor-pointer">
              <a href="#ratings">Ratings</a>
            </li>
            <li className="hover:text-gray-600 cursor-pointer">
              <a href="#features">Features</a>
            </li>
            <li className="hover:text-gray-600 cursor-pointer">
              <a href="#joinus">Join Us</a>
            </li>
            <li className="hover:text-gray-600 cursor-pointer">
              <a href="#footer">Contact</a>
            </li>
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            {loggedin ? (
              <User />
            ) : (
              <div className="nav-items-right flex items-center gap-4">
                <a href="/login" className="hover:text-gray-600">
                  Log In
                </a>
                <a
                  href="/register"
                  className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <motion.button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors z-50"
            onClick={toggleMenu}
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: isMenuOpen ? 90 : 0,
                scale: isMenuOpen ? 0.8 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <motion.div
                  className="w-6 h-6 relative"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.span
                    className="absolute w-full h-0.5 bg-black"
                    style={{ top: "50%", left: 0 }}
                    animate={{ rotate: 45 }}
                  />
                  <motion.span
                    className="absolute w-full h-0.5 bg-black"
                    style={{ top: "50%", left: 0 }}
                    animate={{ rotate: -45 }}
                  />
                </motion.div>
              ) : (
                <Menu size={24} />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-white z-40 md:hidden"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={menuVariants}
            >
              <div className="px-4 pt-20 pb-10 flex flex-col gap-4 bg-white">
                <ul className="flex flex-col gap-5 text-md items-center">
                  <motion.li
                    className="hover:text-gray-600 cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: -20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: 0.1 }}
                  >
                    <a href="#about">About</a>
                  </motion.li>
                  <motion.li
                    className="hover:text-gray-600 cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: -20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: 0.2 }}
                  >
                    Pricing
                  </motion.li>
                  <motion.li
                    className="hover:text-gray-600 cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: -20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: 0.3 }}
                  >
                    Features
                  </motion.li>
                  <motion.li
                    className="hover:text-gray-600 cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: -20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: 0.4 }}
                  >
                    Integration
                  </motion.li>
                  <motion.li
                    className="hover:text-gray-600 cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: -20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: 0.5 }}
                  >
                    Blog
                  </motion.li>
                  <motion.li
                    className="hover:text-gray-600 cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: -20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: 0.6 }}
                  >
                    Contact
                  </motion.li>
                </ul>

                {/* Mobile Auth Buttons */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  transition={{ delay: 0.7 }}
                >
                  {loggedin ? (
                    <div className="py-2">
                      <User />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 py-2">
                      <a
                        href="/login"
                        className="text-center hover:text-gray-600"
                      >
                        Log In
                      </a>
                      <a
                        href="/register"
                        className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-gray-800 transition-colors"
                      >
                        Sign Up
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div className="h-20 md:h-24 lg:h-28" />
    </>
  );
}

export default Navbar;
