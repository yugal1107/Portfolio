import React, { useState } from "react";
import StoryCard from "./StoryCard";

function StoryList() {
  const [stories] = useState([
    {
      id: 1,
      title: "My First Story",
      description: "This is a sample story description",
      date: "2024-01-20",
      imageUrl: "https://placeholder.com/300x200",
    },
    // Add more sample stories as needed
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            title={story.title}
            date={story.date}
            image={story.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default StoryList;
