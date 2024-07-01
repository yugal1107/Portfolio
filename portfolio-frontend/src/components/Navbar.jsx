import { React, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../assets/menu.jsx";
import Close from "../assets/close.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="text-white justify-between align-middle px-4 py-6 border-b-2 border-gray-400  bg-black max-w-full overflow-x-hidden">
        <div className="flex justify-between">
          <div className="text-3xl font-extralight">
            <span className="text-red-500">Y</span>ugal{" "}
            <span className="text-red-500">B</span>urde
          </div>
          <div className="pt-2">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg> */}
            {isOpen ? <Close onClick={toggleMenu} /> : <Menu onClick={toggleMenu} />}
          </div>
        </div>
        <div className={`absolute p-3 left-0 right-0 flex flex-col gap-5 text-xl font-light backdrop-blur-md bg-white/30 ${isOpen ? 'top-20' : '-top-96'}`}>  
          <Link to="">Home</Link>
          <Link to="">About Me</Link>
          <Link to="">Skills</Link>
          <Link to="">Certifications</Link>
          <Link to="">Blogs</Link>
          <Link to="">Contact Me</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
