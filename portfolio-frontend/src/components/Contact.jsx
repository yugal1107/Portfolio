import React from "react";
import TextAnimation from "./TextAnimation";
import { SiMaildotru, SiGithub, SiX, SiLinkedin } from "react-icons/si";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "./ui/typewriter-effect";
import Profiles from "./myUI/Profiles";

const Contact = () => {
  return (
    <section id="contact" className="py-10 px-8">
      <div className="container mx-auto text-center px-4">
        <div className="p-2">
          {/* <TextAnimation text="Contact Me" /> */}
          <TypewriterEffect
            words={[
              { text: "Contact", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
              { text: "Me", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
            ]}
          />
        </div>

        <Profiles />

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
