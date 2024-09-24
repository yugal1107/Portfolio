import React, { useEffect } from "react";
import Projects from "../components/Projects";
import Introduction from "../components/Introduction";
import App from "../components/ParticlesBackground";
import Contact from "../components/Contact";
import About from "../components/About";
import StoriesComponent from "../components/Stories/component";
// import Menu from "../assets/menu.svg";

function Home() {
  return (
    // <div id="particles-js" className="bg-black">
    // <BackgroundBeamsWithCollision>
    <div id="particles-js" className="bg-black font-montserrat">
      {/* <App /> */}
      <Introduction />
      <Projects />
      <StoriesComponent />
      <About />
      <Contact />
    </div>
    // </BackgroundBeamsWithCollision>
  );
}

export default Home;

<div id="particles-js"></div>;
