import React, { useEffect } from "react";
import Projects from "../components/Projects";
import Introduction from "../components/Introduction";
import App from "../components/ParticlesBackground";
import Contact from "../components/Contact";
import About from "../components/About";
// import Menu from "../assets/menu.svg";

function Home() {

  return (
    <div id="particles-js" className="bg-black">
      {/* <App /> */}
      <Introduction />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}

export default Home;

<div id="particles-js"></div>;
