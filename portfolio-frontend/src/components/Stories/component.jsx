import { React, useState } from "react";
import storiesData from "./data.json";
import StoryCard from "./StoryCard";
import { ThreeDCard } from "./ThreeDCard";
import { TypewriterEffect } from "../ui/typewriter-effect";
import SectionWrapper from "../SectionWrapper";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function StoriesComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [storiesToShow, setstoriesToShow] = useState(2);
  const [viewAll, setViewAll] = useState(true);

  const handleNext = () => {
    if (currentIndex + storiesToShow < storiesData.stories.length) {
      setCurrentIndex(currentIndex + storiesToShow);
      console.log(currentIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex - storiesToShow >= 0) {
      setCurrentIndex(currentIndex - storiesToShow);
    }
  };

  return (
    <SectionWrapper>
      {/* <h1 className="text-5xl font-bold text-center text-white">Stories</h1> */}
      <TypewriterEffect
        words={[
          {
            text: "Stories",
            className: "dark:text-yellow-300 font-light text-4xl md:text-6xl",
          },
        ]}
      />
      <button
        onClick={handlePrev}
        className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold p-16 hidden lg:block"
      >
        <FaArrowLeft />
      </button>
      <div className=" flex flex-col lg:flex-row lg:gap-20 justify-center mx-auto">
        {storiesData.stories
          .slice(currentIndex, currentIndex + storiesToShow)
          .map((story, index) => {
            return (
              <ThreeDCard
                id={story.id}
                key={story.id}
                title={story.title}
                date={story.date}
                image={story.cardImage}
                status={story.status}
                location={story.location}
              />
            );
          })}

        <button
          className={`bg-gray-900 text-white p-2 px-4 rounded-full mx-auto lg:hidden ${
            viewAll ? "" : "hidden"
          }`}
          onClick={() => {
            setCurrentIndex(0);
            setstoriesToShow(storiesData.stories.length);
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
}



// import React from "react";

// export default function StoryPage({ images, title, description }) {
//   return (
//     <div className="rounded-2xl bg-slate-900">
//       <h2 className="text-2xl font-bold text-center text-white p-4">{title}</h2>
//       {images.map((image, index) => {
//         return (
//           <div key={index} className="flex flex-wrap gap-2">
//             <img src={image} alt="Story" className="w-1/3 rounded-xl" />
//           </div>
//         );
//       })}
//       {description.map((desc, index) => {
//         return (
//           <p key={index} className="text-white p-4">
//             {desc}
//           </p>
//         );
//       })}
//     </div>
//   );
// }
