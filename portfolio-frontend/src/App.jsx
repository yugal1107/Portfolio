import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
