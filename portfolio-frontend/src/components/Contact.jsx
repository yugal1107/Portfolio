import React from "react";
import TextAnimation from "./TextAnimation";

const Contact = () => {
  return (
    <section id="contact" className="py-10">
      <div className="container mx-auto text-center">
        <TextAnimation text="Contact Me" />
        <div className="logos flex justify-around gap-2 overflow-hidden">
          <img className="h-16 border-1 bg-slate-200 rounded-full" src="/linkedin.png" alt=""></img>
          <img className="h-16 border-1 bg-slate-200 rounded-full" src="/github.png" alt=""></img>
          <img className="h-16 border-1" src="/gmail.png" alt=""></img>
          <img className="h-16 border-1 bg-slate-200 rounded-full" src="/twitter.png" alt=""></img>
        </div>
        <p className="text-gray-300 mb-5">
          Feel free to reach out to me via email at example@example.com or
          through my social media channels.
        </p>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              className="w-full p-3 rounded border border-gray-300"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full p-3 rounded border border-gray-300"
              placeholder="Email"
            />
          </div>
          <div>
            <textarea
              className="w-full p-3 rounded border border-gray-300"
              placeholder="Message"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded"
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
