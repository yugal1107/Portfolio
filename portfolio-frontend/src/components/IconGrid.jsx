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
import { SiExpress, SiPostman, SiCplusplus , SiTailwindcss  , SiDocker} from "react-icons/si";

const IconGrid = () => {
  return (
    <div className="flex flex-wrap gap-4 pt-7 md:gap-7 xl:gap-10">
      <DiReact className="text-cyan-500 text-7xl md:text-9xl" />
      <DiPython className="text-yellow-400 text-7xl md:text-9xl" />
      <DiMongodb className="text-green-500 text-7xl md:text-9xl" />
      <DiJavascript1 className="text-yellow-300 text-7xl md:text-9xl"/>
      <DiNodejs className="text-green-600 text-7xl md:text-9xl" />
      <DiDjango className="text-green-800 text-7xl md:text-9xl" />
      <DiLinux className="text-white text-7xl md:text-9xl" />
      <SiExpress className="text-yellow-200 text-7xl md:text-9xl" />
      <SiPostman className="text-orange-500 text-7xl md:text-9xl" />
      <SiCplusplus className="text-blue-500 text-7xl md:text-9xl" />
      <SiTailwindcss className="text-cyan-500 text-7xl md:text-9xl" />
      <SiDocker className="text-cyan-600 text-7xl md:text-9xl" />
    </div>
  );
};
export default IconGrid;
