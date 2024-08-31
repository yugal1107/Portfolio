import React from "react";

const SectionWrapper = ({ children }) => {
  return (
    <section id="projects" className="relative py-10 px-8 pb-24">
      {children}
    </section>
  );
};

export default SectionWrapper;
