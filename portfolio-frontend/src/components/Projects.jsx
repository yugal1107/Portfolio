import React from "react";

import TextAnimation from "./TextAnimation";

const projects = [
  {
    title: "Dynamic Movies Website",
    description:
      "Developed a dynamic movies website with Node.js, Express.js, EJS, and an external API, allowing users to explore movie details, view films by cast members, and browse by genre.",
    link: "https://ymoviez.vercel.app/",
  },
  {
    title: "Data Analysis Using Python",
    description:
      "Analyzed data using Python libraries such as Pandas and Matplotlib to gain insights into the data of marks of students and visualize the results.",
    link: "#",
  },
  // {
  //   title: "Project Three",
  //   description: "Description of project three.",
  //   link: "#",
  // },
];

const Projects = () => {
  return (
    <section id="projects" className="py-10">
      <div className="container mx-auto text-center">
        {/* <h2 className="text-4xl text-yellow-300 font-normal mb-5">My Projects</h2> */}
        <TextAnimation text="Projects"/>
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className=" bg-white/15 p-5 mx-1 rounded-xl shadow -z-0 backdrop-blur-sm"
            >
              <h3 className="brightness-150 text-xl text-yellow-300 font-light mb-2">
                {project.title}
              </h3>
              <p className="text-gray-100 mb-4">{project.description}</p>
              <a href={project.link} className="text-blue-500 hover:underline">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
