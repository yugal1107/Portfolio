import React from "react";
import {
  DiReact,
  DiPython,
  DiMongodb,
  DiJavascript1,
  DiNodejs,
  DiDjango,
  DiLinux,
  DiCode,
  DiMootoolsBadge,
} from "react-icons/di";
import {
  SiExpress,
  SiPostman,
  SiCplusplus,
  SiTailwindcss,
  SiDocker,
  SiGithub,
  SiGit,
  SiEducative,
  SiGithubactions,
  SiLeetcode,
  SiCodechef,
  SiCodeforces,
} from "react-icons/si";

const TechStackGrid = () => {
  const techStack = [
    {
      category: "Backend",
      icon: <SiEducative />,
      items: [
        {
          icon: <DiDjango />,
          name: "Django",
          hoverColor: "hover:text-green-800",
        },
        {
          icon: <SiExpress />,
          name: "Express.js",
          hoverColor: "hover:text-yellow-200",
        },
        {
          icon: <DiNodejs />,
          name: "Node.js",
          hoverColor: "hover:text-green-600",
        },
        {
          icon: <SiDocker />,
          name: "Docker",
          hoverColor: "hover:text-cyan-600",
        },
      ],
    },
    {
      category: "Frontend",
      icon: <SiTailwindcss />,
      items: [
        { icon: <DiReact />, name: "React", hoverColor: "hover:text-cyan-500" },
        {
          icon: <SiTailwindcss />,
          name: "Tailwind CSS",
          hoverColor: "hover:text-cyan-500",
        },
      ],
    },
    {
      category: "Version Control",
      icon: <SiGithubactions />,
      items: [
        { icon: <SiGit />, name: "Git", hoverColor: "hover:text-red-500" },
        { icon: <SiGithub />, name: "GitHub", hoverColor: "hover:text-white" },
      ],
    },
    {
      category: "DSA/CP",
      icon: <DiCode />,
      items: [
        {
          icon: <DiPython />,
          name: "Python",
          hoverColor: "hover:text-yellow-400",
        },
        {
          icon: <SiCplusplus />,
          name: "C++",
          hoverColor: "hover:text-blue-500",
        },
        {
          icon: <SiLeetcode />,
          name: "LeetCode",
          hoverColor: "hover:text-yellow-400",
        },
        {
          icon: <SiCodechef />,
          name: "CodeChef",
          hoverColor: "hover:text-yellow-900",
        },
        {
          icon: <SiCodeforces />,
          name: "Codeforces",
          hoverColor: "hover:text-blue-300",
        },
      ],
    },

    {
      category: "Programming Languages",
      icon: <DiCode />,
      items: [
        {
          icon: <DiPython />,
          name: "Python",
          hoverColor: "hover:text-yellow-400",
        },
        {
          icon: <DiJavascript1 />,
          name: "JavaScript",
          hoverColor: "hover:text-yellow-300",
        },
        {
          icon: <SiCplusplus />,
          name: "C++",
          hoverColor: "hover:text-blue-500",
        },
      ],
    },
    {
      category: "Tools/Platforms",
      icon: <DiMootoolsBadge />,
      items: [
        { icon: <DiLinux />, name: "Linux", hoverColor: "hover:text-white" },
        {
          icon: <SiDocker />,
          name: "Docker",
          hoverColor: "hover:text-cyan-600",
        },
        {
          icon: <SiPostman />,
          name: "Postman",
          hoverColor: "hover:text-orange-500",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 gap-4">
        {techStack.map((section, index) => (
          <div
            key={index}
            className={`${index == 0 || index == 3 ? "md:col-span-4" : ""} ${
              index == 4 || index == 5 ? "md:col-span-3" : ""
            } col-span-1 md:col-span-2 p-2 rounded-lg border hover:border-gray-600 hover:scale-y-105 transition-all ease-in-out`}
          >
            <h2 className="flex gap-2 text-2xl font-semibold text-neutral-100 mb-4">
              <span className="text-2xl">{section.icon}</span>
              {section.category}
            </h2>
            <div className="flex flex-wrap justify-around">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center p-4 rounded-2xl bg-transparent text-white transition-all duration-300 ${item.hoverColor} hover:bg-slate-900`}
                >
                  <div className="text-4xl md:text-7xl px-3">{item.icon}</div>
                  <p className="mt-2 text-center text-sm md:text-base">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackGrid;
