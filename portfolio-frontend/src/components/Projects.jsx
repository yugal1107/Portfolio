import React, { useState } from "react";
import TextAnimation from "./TextAnimation";
import ProjectCard from "./ProjectCard";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { ProjectThreeDCard } from "./Projects3dcard";
import SectionWrapper from "./SectionWrapper";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const projects = [
  {
    title: "Dynamic Movies Website",
    description:
      "Developed a dynamic movies website with Node.js, Express.js, EJS, and an external API, allowing users to explore movie details, view films by cast members, and browse by genre.",
    link: "https://moviesfrontend-two.vercel.app/",
    photolink: "/project1.png",
  },
  {
    title: "AI Quiz Generator",
    description:
      "An AI-powered quiz generator that creates random MCQs on any topic. Users can select the difficulty level and receive their score instantly after completing the quiz.",
    link: "https://quizzzify.vercel.app",
    photolink: "/ai-quiz.png",
  },
  {
    title: "Data Analysis Using Python",
    description:
      "Analyzed data using Python libraries such as Pandas and Matplotlib to gain insights into the data of marks of students and visualize the results.",
    link: "https://github.com/yugal1107/Python-Project-Data-Visualization-of-midsem-marks",
    photolink: "/project2-front.png",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectsToShow, setprojectsToShow] = useState(2);
  const [viewAll, setViewAll] = useState(true);

  const handleNext = () => {
    if (currentIndex + projectsToShow < projects.length) {
      setCurrentIndex(currentIndex + projectsToShow);
    }
  };

  const handlePrev = () => {
    if (currentIndex - projectsToShow >= 0) {
      setCurrentIndex(currentIndex - projectsToShow);
    }
  };

  return (
    <SectionWrapper>
      {/* <TextAnimation
          text="Projects"
          className="text-4xl text-[#66d9ef] font-normal mb-5"
        />{" "} */}
      <TypewriterEffect
        words={[
          {
            text: "Projects",
            className: "dark:text-yellow-300 font-light text-4xl md:text-6xl",
          },
        ]}
      />
      {/* Changed text color to a bright blue-green */}
      {/* <div className="grid grid-cols-1 mx-4 md:grid-cols-2 gap-7 xl:mt-10"> */}
      <button
        onClick={handlePrev}
        className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold p-16 hidden lg:block"
      >
        <FaArrowLeft />
      </button>
      <div className=" flex flex-col lg:flex-row gap-2 lg:gap-20 justify-center mx-auto">
        {projects
          .slice(currentIndex, currentIndex + projectsToShow)
          .map((project, index) => (
            // <ProjectCard project={project} key={index} />
            <ProjectThreeDCard
              key={index}
              title={project.title}
              livelink={project.link}
              cardImage={project.photolink}
              description={project.description}
            />
          ))}

        <button
          className={`bg-gray-900 text-white p-2 px-4 rounded-full mx-auto lg:hidden ${
            viewAll ? "" : "hidden"
          }`}
          onClick={() => {
            setCurrentIndex(0);
            setprojectsToShow(projects.length);
            setViewAll(false);
          }}
        >
          View All <FaArrowDown className="inline lg:hidden" />
        </button>
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold p-16 hidden lg:block"
      >
        <FaArrowRight />
      </button>
    </SectionWrapper>
  );
};

export default Projects;
