import React, { useEffect, useState } from "react";
import Projects from "../components/Projects";
import Introduction from "../components/Introduction";
import App from "../components/ParticlesBackground";
import Contact from "../components/Contact";
import About from "../components/About";
import StoriesComponent from "../components/Stories/component";
import { getPublicHome, getPublicStories } from "../services/publicApi";
// import Menu from "../assets/menu.svg";

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [stories, setStories] = useState([]);
  const [loadingHome, setLoadingHome] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const [homeError, setHomeError] = useState("");
  const [storiesError, setStoriesError] = useState("");

  useEffect(() => {
    const loadHome = async () => {
      try {
        setLoadingHome(true);
        const data = await getPublicHome();
        setHomeData(data);
      } catch (error) {
        console.error("Failed to load home data", error);
        setHomeError("Failed to load home content.");
      } finally {
        setLoadingHome(false);
      }
    };

    const loadStories = async () => {
      try {
        setLoadingStories(true);
        const data = await getPublicStories();
        setStories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load stories", error);
        setStoriesError("Failed to load stories.");
      } finally {
        setLoadingStories(false);
      }
    };

    loadHome();
    loadStories();
  }, []);

  return (
    // <div id="particles-js" className="bg-black">
    // <BackgroundBeamsWithCollision>
    <div id="particles-js" className="bg-black font-montserrat">
      {/* <App /> */}
      <Introduction
        settings={homeData?.settings}
        isLoading={loadingHome}
        error={homeError}
      />
      <Projects
        projects={homeData?.projects ?? []}
        isLoading={loadingHome}
        error={homeError}
      />
      <StoriesComponent
        stories={stories}
        isLoading={loadingStories}
        error={storiesError}
      />
      <About
        skillGroups={homeData?.skillGroups ?? []}
        isLoading={loadingHome}
        error={homeError}
      />
      <Contact />
    </div>
    // </BackgroundBeamsWithCollision>
  );
}

export default Home;

<div id="particles-js"></div>;
