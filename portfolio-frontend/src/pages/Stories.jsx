import React, { useEffect, useState } from "react";

import StoriesComponent from "../components/Stories/component.jsx";
import { getPublicStories } from "../services/publicApi";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoading(true);
        const data = await getPublicStories();
        setStories(Array.isArray(data) ? data : []);
      } catch (loadError) {
        console.error("Failed to load stories", loadError);
        setError("Failed to load stories.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <div className="bg-black min-h-screen font-montserrat">
      <StoriesComponent stories={stories} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Stories;
