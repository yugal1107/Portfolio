import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-10 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-5">Contact Me</h2>
        <p className="text-gray-700 mb-5">
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
