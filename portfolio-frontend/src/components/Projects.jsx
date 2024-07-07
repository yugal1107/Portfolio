import React from "react";
import TextAnimation from "./TextAnimation";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Dynamic Movies Website",
    description:
      "Developed a dynamic movies website with Node.js, Express.js, EJS, and an external API, allowing users to explore movie details, view films by cast members, and browse by genre.",
    link: "https://ymoviez.vercel.app/",
    photolink: "/project1.png",
  },
  {
    title: "Data Analysis Using Python",
    description:
      "Analyzed data using Python libraries such as Pandas and Matplotlib to gain insights into the data of marks of students and visualize the results.",
    link: "#",
    photolink: "/project2-front.png",
  },
  // {
  //   title: "Project Three",
  //   description: "Description of project three.",
  //   link: "#",
  // },
];

const Projects = () => {
  return (
    <section id="projects" className="py-10 ">
      <div className="container mx-auto text-center">
        <TextAnimation
          text="Projects"
          className="text-4xl text-[#66d9ef] font-normal mb-5"
        />{" "}
        {/* Changed text color to a bright blue-green */}
        <div className="grid grid-cols-1 mx-4 md:grid-cols-2 gap-7 xl:mt-10">
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
