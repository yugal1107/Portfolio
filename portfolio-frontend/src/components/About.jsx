import React from "react";
import TextAnimation from "./TextAnimation";
import IconGrid from "./IconGrid";
import { TypewriterEffect } from "./ui/typewriter-effect";

const About = () => {
  return (
    <section id="about" className="py-10 ">
      <div className="flex justify-center">
        {/* <TextAnimation text="My Tech Stack" /> */}
        <TypewriterEffect
          words={[
            { text: "My", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
            { text: "Tech", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
            { text: "Stack", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
          ]}
        />
      </div>
      <div className="px-4">
        <IconGrid />
      </div>
    </section>
  );
};
export default About;
