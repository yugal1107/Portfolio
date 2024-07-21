import React from 'react';

function ProjectCard({ project, index }) {
    return (
        <div
              key={index}
              className="bg-slate-950 border border-slate-700 p-1 mx-1 rounded-xl pb-5 shadow-slate-900 shadow-md hover:shadow-2xl hover:border-slate-500 transition duration-300 ease-in-out flex flex-col gap-4 items-start" // Changed background color to a dark gray
            >
              {/* Changed text color to a bright blue-green */}
              <img
                src={project.photolink}
                alt="project1"
                className="w-full h-60 xl:h-80 object-cover rounded-t-xl"
              />
              <h3 className="text-2xl text-yellow-300 text-left ml-3 font-semibold">
                {project.title}
              </h3>
              <p className="text-gray-300 text-left ml-3 line-clamp-2">{project.description}</p>{" "}
              {/* Changed text color to a lighter gray */}
              <a
                href={project.link}
                className="bg-yellow-300 p-2 px-4 ml-3 rounded-sm text-gray-700 font-bold hover:bg-yellow-400 transition duration-150 ease-in-out"
              >
                VIEW
              </a>{" "}
              {/* Changed background color to a bright blue-green and text color to black */}
            </div>
    );
}

export default ProjectCard;