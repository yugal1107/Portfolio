import React, { useMemo, useState } from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { ProjectThreeDCard } from "./Projects3dcard";
import SectionWrapper from "./SectionWrapper";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { resolveImageUrl } from "../lib/cloudinary";

const Projects = ({ projects = [], isLoading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectsToShow, setprojectsToShow] = useState(2);
  const [viewAll, setViewAll] = useState(true);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  }, [projects]);

  const handleNext = () => {
    if (currentIndex + projectsToShow < sortedProjects.length) {
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

      {error && (
        <div className="text-center text-red-300 mt-4">{error}</div>
      )}

      {isLoading && (
        <div className="text-center text-gray-300 mt-4">Loading projects...</div>
      )}

      {!isLoading && sortedProjects.length === 0 && !error && (
        <div className="text-center text-gray-300 mt-4">No projects published yet.</div>
      )}

      <button
        onClick={handlePrev}
        className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold p-16 hidden lg:block"
      >
        <FaArrowLeft />
      </button>
      <div className=" flex flex-col lg:flex-row gap-2 lg:gap-20 justify-center mx-auto">
        {sortedProjects
          .slice(currentIndex, currentIndex + projectsToShow)
          .map((project, index) => (
            <ProjectThreeDCard
              key={project.slug || index}
              title={project.title}
              livelink={project.liveUrl}
              cardImage={resolveImageUrl(
                project.imageUrl,
                project.imagePublicId,
                "projectCard",
              )}
              description={project.description}
              githublink={project.githubUrl}
            />
          ))}

        <button
          className={`bg-gray-900 text-white p-2 px-4 rounded-full mx-auto lg:hidden ${
            viewAll && sortedProjects.length > projectsToShow ? "" : "hidden"
          }`}
          onClick={() => {
            setCurrentIndex(0);
            setprojectsToShow(sortedProjects.length);
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
