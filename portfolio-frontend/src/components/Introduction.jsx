import React from "react";
import { motion } from "framer-motion";
import profile from "/profile.jpg";
import { HoverBorderGradient } from "./ui/HoverBorderGradient";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import ChatBot from "./ChatBot";

const Introduction = () => {
  const handleClick = () => {
    window.open(
      "https://drive.google.com/file/d/1Upi9GbANVs9rlurVwAAmyi6Oi37b-O3o/view?usp=sharing",
      "_blank"
    );
  };

  const socialLinks = [
    { icon: <FaGithub size={24} />, url: "https://github.com/yugal1107" },
    {
      icon: <FaLinkedin size={24} />,
      url: "https://www.linkedin.com/in/yugal-burde-58012a256/",
    },
    { icon: <FaTwitter size={24} />, url: "https://twitter.com/YugalBurde" },
    {
      icon: <FaInstagram size={24} />,
      url: "https://www.instagram.com/yugal__1107",
    }, // Add your Instagram username here
  ];

  return (
    <section className="home-first-section container flex-col pb-10 px-4 sm:px-8 text-white justify-around md:flex md:flex-row items-center mx-auto overflow-x-hidden min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="basis-1/2 content-center mt-8 md:mt-0"
      >
        <div className="px-4 sm:px-6 lg:px-16 xl:px-28">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-60 h-60 sm:w-64 sm:h-64 md:w-auto md:h-auto mx-auto p-3 sm:p-6 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 object-cover"
            src={profile}
            alt="Profile"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-col basis-1/2 gap-2 align-middle mt-8 md:mt-0 text-center md:text-left"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl xl:text-5xl font-bold"
        >
          Hello <span className="animate-wave inline-block">👋</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl xl:text-5xl mt-2 sm:mt-4"
        >
          <span className="text-yellow-300 py-2">I'm</span>{" "}
          <div className="inline-flex flex-wrap justify-center md:justify-start gap-2">
            <span className="playwrite-hr-lijeva-tile text-red-500">Yugal</span>{" "}
            <span className="playwrite-hr-lijeva-tile text-blue-500">
              Burde
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg xl:text-xl text-slate-500 mt-2"
        >
          Full Stack Developer
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-neutral-300 my-4 p-2 text-sm sm:text-base xl:text-xl font-space-monospace max-w-2xl mx-auto md:mx-0"
        >
          I am a passionate developer with experience in creating dynamic and
          responsive web applications. Currently pursuing B.Tech at MITS Gwalior
          with an 8.5 CGPA. Skilled in MERN stack, API development, and
          programming languages including Javascript, Python, and C++.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full flex flex-col sm:flex-row gap-6 items-center justify-center md:justify-start"
        >
          <HoverBorderGradient onClick={handleClick} className="w-fit">
            <span className="text-sm sm:text-base">Download Resume</span>
          </HoverBorderGradient>
          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Add the ChatBot component */}
        {/* <ChatBot /> */}
      </motion.div>
    </section>
  );
};

export default Introduction;
