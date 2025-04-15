import React from "react";
import "../assets/css/Home.css";
import { Player } from "@lottiefiles/react-lottie-player";
import botAnimation from "../assets/lottie/hi.json"; // adjust the path based on the actual file name

const Home = () => {
  return (
    <div className="main-container">
      <h2 className="typing-title">Welcome to the Image Recognition App</h2>
      <div className="bot-wave">
        <Player
          autoplay
          loop
          src={botAnimation}
          className="bot-gif"
        />
      </div>
    </div>
  );
};

export default Home;
