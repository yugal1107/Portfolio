import React from "react";
import {
  DiReact,
  DiPython,
  DiMongodb,
  DiJavascript1,
  DiNodejs,
  DiDjango,
  DiLinux,
} from "react-icons/di";
import {
  SiExpress,
  SiPostman,
  SiCplusplus,
  SiTailwindcss,
  SiDocker,
  SiGithub,
  SiGit,
} from "react-icons/si";

const IconGrid = ({ className }) => {
  return (
    <div
      className={`flex flex-wrap justify-center gap-4 pt-7 md:gap-7 xl:gap-10 ${className}`}
    >
      <DiReact className="text-white hover:text-cyan-500 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <DiPython className="text-white hover:text-yellow-400 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <DiMongodb className="text-white hover:text-green-500 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <DiJavascript1 className="text-white hover:text-yellow-300 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <DiNodejs className="text-white hover:text-green-600 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <DiDjango className="text-white hover:text-green-800 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <DiLinux className="text-white hover:text-white text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <SiExpress className="text-white hover:text-yellow-200 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <SiPostman className="text-white hover:text-orange-500 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <SiCplusplus className="text-white hover:text-blue-500 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <SiTailwindcss className="text-white hover:text-cyan-500 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <SiDocker className="text-white hover:text-cyan-600 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <SiGithub className="text-white hover:text-white text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
      <SiGit className="text-white hover:text-red-500 text-7xl md:text-9xl p-4 rounded-2xl  hover:bg-slate-900" />
    </div>
  );
};
export default IconGrid;
