import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-5">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:underline">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
