import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stories from "./pages/Stories.jsx";
import TechStack from "./components/myUI/TechStack.jsx";
import StoryPage from "./components/Stories/StoryPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/tech" element={<TechStack />} />
        <Route path="/story/:id" element={<StoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from 'react';
// import Header from './components/Header';
// import About from './components/About';
// import Projects from './components/Projects';
// import Contact from './components/Contact';

// function App() {
//   return (
//     <div>
//       <Header />
//       <About />
//       <Projects />
//       <Contact />
//     </div>
//   );
// }

// export default App;
