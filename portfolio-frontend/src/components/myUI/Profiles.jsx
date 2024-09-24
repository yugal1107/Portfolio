import React from "react";
import { SiMaildotru, SiGithub, SiX, SiLinkedin } from "react-icons/si";


function Profiles() {
  return (
    <div className="left-container flex flex-col px-6 items-start justify-center">
      <div className="text-gray-300 md:text-md xl:text-xl  text-left ">
        Feel free to reach out to me via email at yugal1107@gmail.com or through
        my social media channels.
      </div>
      <a
        href="mailto:yugal1107@gmail.com"
        className="flex gap-4 align-middle my-4"
      >
        <SiMaildotru className="text-red-600 text-xl md:text-2xl mt-1" />
        <div className="text-red-500 md:text-md xl:text-xl">
          yugal1107@gmail.com
        </div>
      </a>

      <div className=" logos flex gap-10 overflow-hidden py-4">
        <a href="http://github.com/yugal1107">
          <SiGithub className="text-red-600 md:text-l xl:text-3xl" />
        </a>
        <a href="https://x.com/YugalBurde">
          <SiX className="text-red-600 md:text-l xl:text-3xl" />
        </a>
        <a href="https://www.linkedin.com/in/yugal-burde-58012a256/">
          <SiLinkedin className="text-red-600 md:text-l xl:text-3xl" />
        </a>
      </div>
    </div>
  );
}

export default Profiles;
