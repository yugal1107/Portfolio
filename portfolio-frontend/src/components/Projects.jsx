import React from "react";

const projects = [
  {
    title: "Dynamic Movies Website",
    description: "Developed a dynamic movies website with Node.js, Express.js, EJS, and an external API, allowing users to explore movie details, view films by cast members, and browse by genre.",
    link: "#",
  },
  {
    title: "Data Analysis Using Python",
    description: "Analyzed data using Python libraries such as Pandas and Matplotlib to gain insights into the data of marks of students and visualize the results.",
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
    <section id="projects" className="py-10
     bg-black">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl text-yellow-300 font-normal mb-5">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-900  p-5 rounded shadow">
              <h3 className="text-xl text-yellow-300 font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
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
