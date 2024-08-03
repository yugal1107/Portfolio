import React from "react";
import TextAnimation from "./TextAnimation";
import { SiMaildotru, SiGithub, SiX, SiLinkedin } from "react-icons/si";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "./ui/typewriter-effect";

const Contact = () => {
  return (
    <section id="contact" className="py-10 px-8">
      <div className="container mx-auto text-center px-4">
        <div className="p-2">
          {/* <TextAnimation text="Contact Me" /> */}
          <TypewriterEffect
            words={[
              { text: "Contact", className: "dark:text-yellow-300 font-light" },
              { text: "Me", className: "dark:text-yellow-300 font-light" },
            ]}
          />
        </div>
        <div className="left-container flex flex-col px-6 items-start justify-center">
          <div className="text-gray-300 md:text-md xl:text-xl  text-left ">
            Feel free to reach out to me via email at yugal1107@gmail.com or
            through my social media channels.
          </div>
          <a
            href="mailto:yugal1107@gmail.com"
            className="flex gap-4 align-middle my-4"
          >
            <SiMaildotru className="text-red-600 text-xl md:text-2xl mt-1" />
            <div className="text-red-500 md:text-md xl:text-xl">
              yugal1107@gmail.com
            </div>
          </a>

          <div className=" logos flex gap-10 overflow-hidden py-4">
            <a href="http://github.com/yugal1107">
              <SiGithub className="text-red-600 md:text-l xl:text-3xl" />
            </a>
            <a href="https://x.com/YugalBurde">
              <SiX className="text-red-600 md:text-l xl:text-3xl" />
            </a>
            <a href="https://www.linkedin.com/in/yugal-burde-58012a256/">
              <SiLinkedin className="text-red-600 md:text-l xl:text-3xl" />
            </a>
          </div>
        </div>

        <form className="space-y-4 xl:mx-4 xl:my-2">
          <div>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-1"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full rounded border border-gray-300 p-1"
              placeholder="Email"
            />
          </div>
          <div>
            <textarea
              className="w-full rounded border border-gray-300 p-1"
              placeholder="Message"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="px-6 p-3 bg-yellow-300 text-slate-700 font-semibold rounded mx-auto"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
