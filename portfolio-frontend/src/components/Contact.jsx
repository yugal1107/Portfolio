import React, { useState } from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";
import Profiles from "./myUI/Profiles";
import { submitContactMessage } from "../services/publicApi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError("Please fill in all fields.");
      setSuccessMessage("");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      await submitContactMessage({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      });

      setName("");
      setEmail("");
      setMessage("");
      setSuccessMessage("Thanks! Your message has been sent.");
    } catch (submitError) {
      setError(submitError.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 px-8">
      <div className="container mx-auto text-center px-4">
        <div className="p-2">
          <TypewriterEffect
            words={[
              { text: "Contact", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
              { text: "Me", className: "dark:text-yellow-300 font-light text-4xl md:text-6xl" },
            ]}
          />
        </div>

        <Profiles />

        <form className="space-y-4 xl:mx-4 xl:my-2" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-1"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full rounded border border-gray-300 p-1"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
            onChange={() => {}}
          />
          <div>
            <textarea
              className="w-full rounded border border-gray-300 p-1"
              placeholder="Message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSubmitting}
            ></textarea>
          </div>
          {error ? <p className="text-left text-red-400 text-sm">{error}</p> : null}
          {successMessage ? (
            <p className="text-left text-green-400 text-sm">{successMessage}</p>
          ) : null}
          <div>
            <button
              type="submit"
              className="px-6 p-3 bg-yellow-300 text-slate-700 font-semibold rounded mx-auto disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
