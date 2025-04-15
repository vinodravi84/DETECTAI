import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ImageUpload from "./components/ImageUpload";
import "./assets/css/App.css";

function App() {
  return (
    <div className="app-container">
      {/* Navbar at the top */}
      <Navbar />

      

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/app" element={<ImageUpload />} />
      </Routes>
    </div>
  );
}

export default App;
