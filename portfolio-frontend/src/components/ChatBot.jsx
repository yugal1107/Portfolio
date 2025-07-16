import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid"; // You may need to install this: npm install uuid

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Yugal. How are you", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId] = useState(uuidv4());
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //   useEffect(() => {
  //     scrollToBottom();
  //     if (isOpen && chatInputRef.current) {
  //       chatInputRef.current.focus();
  //     }
  //   }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id: threadId,
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative w-full max-w-md mx-auto md:mx-0 mt-8 z-50"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full mb-4 left-0 right-0 w-full bg-black/80 backdrop-blur-lg rounded-xl shadow-2xl border border-yellow-500/30 overflow-hidden z-50"
              style={{ maxWidth: "100vw" }}
            >
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 p-3 text-white font-medium flex justify-between items-center border-b border-yellow-500/30">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                  Digital Yugal - Portfolio Assistant
                </div>
                <button
                  onClick={toggleChat}
                  className="text-yellow-300 hover:text-yellow-100 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-4 h-[50vh] sm:h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-600/50 scrollbar-track-transparent">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-xl max-w-[85%] sm:max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-yellow-500 text-black font-medium rounded-tr-none"
                          : "bg-gray-800 text-yellow-100 rounded-tl-none border border-yellow-500/30"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-left mb-3">
                    <div className="inline-block px-4 py-2 rounded-xl max-w-[85%] sm:max-w-[80%] bg-gray-800 text-yellow-100 rounded-tl-none border border-yellow-500/30">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSendMessage}
                className="border-t border-yellow-500/30 p-3 flex"
              >
                <input
                  type="text"
                  ref={chatInputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-900 text-yellow-100 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 placeholder-yellow-300/50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className={`bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded-r-lg px-4 py-2 flex items-center justify-center ${
                    isLoading || !inputMessage.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-yellow-400 hover:to-yellow-500"
                  }`}
                >
                  <FiSend />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleChat}
          className="text-center text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-full py-2 px-4 shadow-lg transition-all duration-300 font-medium"
        >
          Chat with Digital Yugal
        </button>
      </motion.div>
    </>
  );
};

export default ChatBot;
