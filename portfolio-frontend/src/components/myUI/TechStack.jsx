// import React from "react";
// import {
//   Code,
//   Database,
//   Brain,
//   Laptop,
//   Server,
//   Cpu,
//   Globe,
//   FileCode,
// } from "lucide-react";
// import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

// const TechIcon = ({ name, icon: Icon }) => (
//   <div className="flex items-center p-2 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700">
//     <Icon className="w-6 h-6 mr-2 text-blue-400" />
//     <span className="text-sm text-gray-300">{name}</span>
//   </div>
// );

// const TechStack = () => {
//   const techStack = [
//     {
//       category: "Frontend",
//       icon: <Laptop className="w-8 h-8 text-purple-400" />,
//       technologies: [
//         { name: "React", icon: Code },
//         { name: "HTML", icon: FileCode },
//         { name: "CSS", icon: FileCode },
//         { name: "JavaScript", icon: FileCode },
//       ],
//     },
//     {
//       category: "Backend",
//       icon: <Server className="w-8 h-8 text-green-400" />,
//       technologies: [
//         { name: "Node.js", icon: Server },
//         { name: "Python", icon: Code },
//         { name: "Express", icon: Server },
//         { name: "MongoDB", icon: Database },
//       ],
//     },
//     {
//       category: "DSA/CP",
//       icon: <Cpu className="w-8 h-8 text-yellow-400" />,
//       technologies: [
//         { name: "C++", icon: Code },
//         { name: "Python", icon: Code },
//         { name: "Algorithms", icon: Brain },
//         { name: "LeetCode", icon: Globe },
//       ],
//     },
//   ];

//   return (
//     <div className="p-4 bg-black min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-white text-center">
//         My Tech Stack
//       </h2>
//       {/* <div className="grid grid-cols-2 gap-4">
//         <div className="col-span-2 bg-gray-950 border border-gray-700 hover:border-gray-500 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//           <div className="flex items-center mb-4">
//             {techStack[0].icon}
//             <h3 className="text-2xl font-semibold ml-2 text-white">
//               {techStack[0].category}
//             </h3>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             {techStack[0].technologies.map((tech, techIndex) => (
//               <TechIcon key={techIndex} name={tech.name} icon={tech.icon} />
//             ))}
//           </div>
//         </div>
//         {techStack.slice(1).map((section, index) => (
//           <div
//             key={index}
//             className="bg-gray-950 border border-gray-700 hover:border-gray-500 rounded-xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl"
//           >
//             <div className="flex items-center mb-3">
//               {section.icon}
//               <h3 className="text-xl font-semibold ml-2 text-white">
//                 {section.category}
//               </h3>
//             </div>
//             <div className="grid grid-cols-1 gap-2">
//               {section.technologies.map((tech, techIndex) => (
//                 <TechIcon key={techIndex} name={tech.name} icon={tech.icon} />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div> */}
//       <BentoGrid>
//         {techStack.map((item, index) => (
//           <BentoGridItem>
//             key={index}
//             title={item.category}
//             {/* description={item.description}
//             header={item.header}
//             icon={item.icon} */}
//             className={i === 3 || i === 6 ? "md:col-span-2" : ""}
//           </BentoGridItem>
//         ))}
//       </BentoGrid>
//     </div>
//   );
// };

// export default TechStack;

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
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
const TechStack = () => {
  return (
    <div className="bg-black">
      <BentoGrid className="mt-10">
        {/* Backend */}
        <BentoGridItem
          header={"Backend"}
          title="Backend"
          icon={
            <div className="flex space-x-4 text-white">
              <DiDjango size={40} />
              <SiExpress size={40} />
              <DiNodejs size={40} />
              <SiDocker size={40} />
            </div>
          }
          description="Django, Express.js, Node.js, Docker"
        />

        {/* Frontend */}
        <BentoGridItem
          title="Frontend"
          icon={
            <div className="flex space-x-4 text-white">
              <DiReact size={40} />
              <SiTailwindcss size={40} />
            </div>
          }
          description="React, Tailwind CSS"
        />

        {/* DSA/CP */}
        <BentoGridItem
          title="DSA/CP"
          icon={
            <div className="flex space-x-4 text-white">
              <DiPython size={40} />
              <SiCplusplus size={40} />
            </div>
          }
          description="Python, C++"
        />

        {/* Version Control */}
        <BentoGridItem
          title="Version Control"
          icon={
            <div className="flex space-x-4 text-white">
              <SiGit size={40} />
              <SiGithub size={40} />
            </div>
          }
          description="Git, GitHub"
        />

        {/* Programming Languages */}
        <BentoGridItem
          title="Programming Languages"
          icon={
            <div className="flex space-x-4 text-white">
              <DiPython size={40} />
              <DiJavascript1 size={40} />
              <SiCplusplus size={40} />
            </div>
          }
          description="Python, JavaScript, C++"
        />

        {/* Tools/Platforms */}
        <BentoGridItem
          title="Tools/Platforms"
          icon={
            <div className="flex space-x-4 text-white">
              <DiLinux size={40} />
              <SiDocker size={40} />
              <SiPostman size={40} />
            </div>
          }
          description="Linux, Docker, Postman"
        />
      </BentoGrid>
    </div>
  );
};

export default TechStack;
