import React from "react";

export default function StoriesPage({ images, title, description }) {
  return (
    <div className="rounded-2xl bg-slate-900">
      <h2 className="text-2xl font-bold text-center text-white p-4">{title}</h2>
      {images.map((image, index) => {
        return (
          <div key={index} className="flex flex-wrap gap-2">
            <img src={image} alt="Story" className="w-1/3 rounded-xl" />
          </div>
        );
      })}
      {description.map((desc, index) => {
        return (
          <p key={index} className="text-white p-4">
            {desc}
          </p>
        );
      })}
    </div>
  );
}
