import React from "react";
import TextAnimation from "./TextAnimation";
import ProjectCard from "./ProjectCard";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { ProjectThreeDCard } from "./Projects3dcard";

const projects = [
  {
    title: "Dynamic Movies Website",
    description:
      "Developed a dynamic movies website with Node.js, Express.js, EJS, and an external API, allowing users to explore movie details, view films by cast members, and browse by genre.",
    link: "https://moviesfrontend-two.vercel.app/",
    photolink: "/project1.png",
  },
  {
    title: "Data Analysis Using Python",
    description:
      "Analyzed data using Python libraries such as Pandas and Matplotlib to gain insights into the data of marks of students and visualize the results.",
    link: "https://github.com/yugal1107/Python-Project-Data-Visualization-of-midsem-marks",
    photolink: "/project2-front.png",
  },
  {
    title: "AI Quiz Generator",
    description:
      "An AI-powered quiz generator that creates random MCQs on any topic. Users can select the difficulty level and receive their score instantly after completing the quiz.",
    link: "https://quizzzify.vercel.app",
    photolink: "/ai-quiz.png",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-10 px-8 pb-24">
      <div className="container mx-auto text-center">
        {/* <TextAnimation
          text="Projects"
          className="text-4xl text-[#66d9ef] font-normal mb-5"
        />{" "} */}
        <TypewriterEffect
          words={[
            { text: "Projects", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
          ]}
        />
        {/* Changed text color to a bright blue-green */}
        {/* <div className="grid grid-cols-1 mx-4 md:grid-cols-2 gap-7 xl:mt-10"> */}
        <div className="bg-black flex flex-col lg:flex-row gap-6 overflow-x-scroll">
          {projects.map((project, index) => (
            // <ProjectCard project={project} key={index} />
            <ProjectThreeDCard
              key={index}
              title={project.title}
              livelink={project.link}
              cardImage={project.photolink}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
