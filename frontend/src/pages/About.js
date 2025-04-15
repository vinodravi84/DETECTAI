import React from "react";
import { FaRobot, FaInfoCircle } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import aboutAnimation from "../assets/lottie/about.json"; // Your Lottie file
import "../assets/css/About.css";

const About = () => {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="about-header">
        <h2 className="about-title">
          <FaInfoCircle className="about-icon" /> About This App
        </h2>
        <p className="about-subtitle">
          Explore how this app leverages deep learning to classify images and provide accurate predictions.
        </p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p className="about-description">
            This app uses a cutting-edge deep learning model to classify images into different categories. 
            Simply upload an image, and the model will predict the class with the highest confidence. 
          </p>
          <p className="about-description">
            Built with React for the frontend and FastAPI for the backend, this app offers a seamless user experience.
            The core of the app uses a pre-trained model to make predictions on CIFAR-100 images, which consist of 100 different categories.
          </p>
        </div>

        <motion.div 
          className="about-image"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Player
            autoplay
            loop
            src={aboutAnimation}
            className="about-img"
          />
        </motion.div>
      </div>

      <div className="about-footer">
        <p className="footer-text">Built with 💻 by Vinod</p>
      </div>
    </motion.div>
  );
};

export default About;
