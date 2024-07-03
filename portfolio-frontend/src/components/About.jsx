import React from "react";
import TextAnimation from "./TextAnimation";
import IconGrid from "./IconGrid";

const About = () => {
  return (
    <section id="about" className="py-10 ">
      <div className="flex justify-center">
        <TextAnimation text="My Tech Stack" />
      </div>
      <div className="container mx-auto text-center px-4">
        <div className="left-container flex flex-col px-6">
          {/* <div className="text-gray-300">
            I am a passionate developer with experience in creating dynamic and
            responsive web applications. My expertise includes React, Tailwind
            CSS, and other modern web development technologies.
          </div> */}
          {/* <div className="logos flex gap-10 overflow-hidden py-4 flex-wrap">
            <div className="text-red-500">React</div>
            <div className="text-red-500">Tailwind CSS</div>
            <div className="text-red-500">Node.js</div>
            <div className="text-red-500">Express.js</div>
            <div className="text-red-500">MongoDB</div>
            <div className="text-red-500">PostgreSQL</div>
          </div> */}
        </div>
        <IconGrid />
      </div>
    </section>
  );
};
export default About;
