import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import storiesData from "./data.json";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find story by id from URL params
  const story = storiesData.stories.find((s) => s.id === parseInt(id));

  // Handle case when story is not found
  if (!story) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Story not found
          </h1>
          <button
            onClick={() => navigate("/stories")}
            className="text-gray-300 hover:text-white underline"
          >
            Go back to stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-black">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">{story.title}</h1>
          <p className="text-gray-400">{story.date}</p>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col gap-6">
          {/* Featured Image */}
          {story.images?.[0] && (
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9]">
                <img
                  src={story.images[0]}
                  alt="Featured Event"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          )}

          {/* Remaining Images Grid */}
          {story.images?.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {story.images.slice(1).map((image, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={image}
                      alt={`Event ${index + 2}`}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Story Description */}
        <div className="space-y-4 text-gray-300">
          {story.description?.map((para, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Project Details (if hackathon) */}
        {story.project && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Project: {story.project.name}
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {story.project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 rounded-full text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-300">{story.project.description}</p>
            <a
              href={story.project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center text-blue-400 hover:underline mt-4"
            >
              <FaGithub className="mr-2 text-2xl" /> View on GitHub
            </a>
          </div>
        )}

        {/* Key Outcomes */}
        {story.outcomes && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Key Takeaways
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {story.outcomes.map((outcome, index) => (
                <li key={index} className="text-lg">
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Team Details */}
        {story.team && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Team : {story.team.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.team.members.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-gray-300">{member.role}</p>
                  </div>
                  {member.LinkedIn && (
                    <a
                      href={member.LinkedIn}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center text-blue-400 hover:underline"
                    >
                      <FaLinkedin className="ml-2 text-2xl" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
