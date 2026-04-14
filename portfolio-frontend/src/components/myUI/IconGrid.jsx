import React from "react";
import {
  DiCode,
  DiDjango,
  DiJavascript1,
  DiLinux,
  DiMootoolsBadge,
  DiNodejs,
  DiPython,
  DiReact,
} from "react-icons/di";
import {
  SiCodechef,
  SiCodeforces,
  SiCplusplus,
  SiDocker,
  SiEducative,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiLeetcode,
  SiPostman,
  SiTailwindcss,
} from "react-icons/si";

const iconMap = {
  DiDjango: <DiDjango />,
  SiExpress: <SiExpress />,
  DiNodejs: <DiNodejs />,
  SiDocker: <SiDocker />,
  DiReact: <DiReact />,
  SiTailwindcss: <SiTailwindcss />,
  SiGit: <SiGit />,
  SiGithub: <SiGithub />,
  DiPython: <DiPython />,
  SiCplusplus: <SiCplusplus />,
  SiLeetcode: <SiLeetcode />,
  SiCodechef: <SiCodechef />,
  SiCodeforces: <SiCodeforces />,
  DiJavascript1: <DiJavascript1 />,
  DiLinux: <DiLinux />,
  SiPostman: <SiPostman />,
};

const categoryIconMap = {
  Backend: <SiEducative />,
  Frontend: <SiTailwindcss />,
  "Version Control": <SiGithubactions />,
  "DSA/CP": <DiCode />,
  "Programming Languages": <DiCode />,
  "Tools/Platforms": <DiMootoolsBadge />,
};

const fallbackTechStack = [
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

const mapSkillGroupsToSections = (skillGroups) => {
  if (!Array.isArray(skillGroups) || skillGroups.length === 0) {
    return fallbackTechStack;
  }

  return skillGroups.map((group) => ({
    category: group.name,
    icon: categoryIconMap[group.name] || <DiCode />,
    items: (group.skills || []).map((skill) => ({
      icon: iconMap[skill.iconKey] || <DiCode />,
      name: skill.name,
      hoverColor: "hover:text-cyan-400",
    })),
  }));
};

const TechStackGrid = ({ skillGroups = [], isLoading, error }) => {
  const techStack = mapSkillGroupsToSections(skillGroups);

  if (error) {
    return <div className="text-center text-red-300 mt-4">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-center text-gray-300 mt-4">Loading skills...</div>;
  }

  if (techStack.length === 0) {
    return <div className="text-center text-gray-300 mt-4">No skills published yet.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 gap-4">
        {techStack.map((section, index) => (
          <div
            key={index}
            className={`${index === 0 || index === 3 ? "md:col-span-4" : ""} ${
              index === 4 || index === 5 ? "md:col-span-3" : ""
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
