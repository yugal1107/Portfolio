import React from "react";
import TextAnimation from "./TextAnimation";
import Mail from "../icons/Mail";
import Github from "../icons/github";
import Twitter from "../icons/twitter";
import Linkedin from "../icons/linkedin";

const Contact = () => {
  return (
    <section id="contact" className="py-10">
      <div className="container mx-auto text-center px-4">
        <div>
          <TextAnimation text="Contact Me" />
        </div>
        <div className="left-container flex flex-col px-6">
          <div className="text-gray-300 md:text-md  xl:text-xl">
            Feel free to reach out to me via email at yugal1107@gmail.com or
            through my social media channels.
          </div>
          <a
            href="mailto:yugal1107@gmail.com"
            className="flex gap-4 align-middle py-4"
          >
            <Mail height="24px" width="24px" fill="red" />
            <div className="text-red-500">yugal1107@gmail.com</div>
          </a>

          <div className=" logos flex gap-10 overflow-hidden py-4">
            <a href="http://github.com/yugal1107">
              <Github height="30px" width="30px" fill="red" />
            </a>
            <a href="https://x.com/YugalBurde">
              <Twitter height="30px" width="30px" fill="red" />
            </a>
            <a href="https://www.linkedin.com/in/yugal-burde-58012a256/">
              <Linkedin height="30px" width="30px" fill="red" />
            </a>
          </div>
        </div>

        <form className="space-y-4">
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
              className="w-full p-3 bg-yellow-300 text-slate-700 font-semibold rounded"
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
