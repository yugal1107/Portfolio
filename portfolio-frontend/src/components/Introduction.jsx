import React from "react";
import profile from "/profile.jpg";

const Introduction = () => {
  const handleClick = () => {
    window.open(
      "https://drive.google.com/file/d/1Ybt_OKFDkH-4VidJoQUx7wn9pyH2zNhO/view?usp=sharing",
      "_blank"
    );
  };

  return (
    // <section id="about" className="py-10 bg-gray-100">
    //   <div className="container mx-auto text-center">
    //     <h2 className="text-2xl font-bold mb-5">About Me</h2>
    //     <p className="text-gray-700">
    //       I am a passionate developer with experience in creating dynamic and
    //       responsive web applications. My expertise includes React, Tailwind
    //       CSS, and other modern web development technologies.
    //     </p>
    //   </div>
    // </section>

    <section className="container flex-col pb-10 px-8 text-white justify-around md:flex md:flex-row items-center mx-auto overflow-x-hidden">
      <div className="basis-1/2 content-center">
        <div className="px-6 lg:px-16 xl:px-28">
          <img className="w-auto p-6 grow rounded-full" src={profile}></img>
        </div>
      </div>
      <div className="flex-col basis-1/2 gap-2 align-middle ">
        <h1 className="text-4xl xl:text-5xl">
          Hello <span>👋</span>
        </h1>
        <div className="text-4xl xl:text-5xl xl:pt-2">
          {" "}
          <span className="text-yellow-300 py-2">I'm</span>{" "}
          <span className="text-red-500">Yugal</span> <span>Burde</span>{" "}
        </div>
        <div className="text-md xl:text-xl text-slate-500 xl:pt-1">
          Full Stack Developer
        </div>
        <div className="my-4 p-2 border-solid border-yellow-400 border rounded-xl/ xl:text-xl">
          I am a passionate developer with experience in creating dynamic and
          responsive web applications. I am always eager to learn new
          technologies and improve my skills. I am looking for opportunities to
          work on challenging projects and grow as a developer.
        </div>
        <div className="w-full flex justify-around">
          <button
            onClick={handleClick}
            className="bg-yellow-300 text-black p-2 rounded-sm xl:text-xl"
          >
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
