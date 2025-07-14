import React, { useState } from "react";
import axios from "axios";
import "../assets/css/ImageUpload.css";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../assets/lottie/loading.json";
import processingAnimation from "../assets/lottie/processing.json";
import finalAnimation from "../assets/lottie/final.json";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showUploadOverlay, setShowUploadOverlay] = useState(false);
  const [animateUploadLabel, setAnimateUploadLabel] = useState(false);
  const [showLoadingAnim, setShowLoadingAnim] = useState(false);
  const [showProcessingAnim, setShowProcessingAnim] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setShowImage(false);

      setShowUploadOverlay(true);
      setAnimateUploadLabel(true);

      setTimeout(() => {
        setShowUploadOverlay(false);
        setAnimateUploadLabel(false);
        setShowLoadingAnim(true);
      }, 800);

      setTimeout(() => {
        setShowLoadingAnim(false);
        setShowImage(true);
      }, 3000);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || loading) return;
    setLoading(true);
    setShowProcessingAnim(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const res = await axios.post("https://vinod1122-detectai.hf.space/api/predict_clip", formData);

      setTimeout(() => {
        setPrediction(res.data.prediction);
        setShowProcessingAnim(false);
      }, 5000);
    } catch (err) {
      console.error("Prediction failed:", err);
      setShowProcessingAnim(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setPrediction(null);
    setShowUploadOverlay(false);
    setAnimateUploadLabel(false);
    setShowLoadingAnim(false);
    setShowImage(false);
    setShowProcessingAnim(false);
  };

  const handleClickArea = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <>
      <div className="futuristic-container">
        {!selectedImage ? (
          <div className="drop-area" onClick={handleClickArea}>
            <label htmlFor="imageInput" className="fancy-upload-label">
              <span className="glow-text">🚀 Click to Upload or Drag Image Here</span>
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <div className="preview-card">
            {showUploadOverlay && (
              <div className="upload-label-overlay">
                <span className={`glow-text ${animateUploadLabel ? "upload-label-slide-up" : ""}`}>
                  🚀 Click to Upload or Drag Image Here
                </span>
              </div>
            )}

            {showLoadingAnim ? (
              <div className="loading-box">
                <Player
                  autoplay
                  loop
                  src={loadingAnimation}
                  style={{ height: "150px", width: "150px" }}
                />
                <p className="glow-text">⏳ Uploading Image...</p>
              </div>
            ) : showImage ? (
              <img
                src={previewUrl}
                alt="Uploaded"
                className="image-preview fade-in"
              />
            ) : (
              <div style={{ width: "600px", height: "300px" }} />
            )}

            <div className="button-container">
              <button onClick={handleUpload} className="glow-button" disabled={loading}>
                🔮 Predict
              </button>
              <button onClick={handleRemove} className="remove-button" disabled={loading}>
                ❎ Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animation section on right side */}
      <div className="animation-box">
        {/* Upload Here and Giphy animation */}
        {!selectedImage && !showProcessingAnim && (
          <div className="upload-animation-box">
            <Player
              autoplay
              loop
              src={finalAnimation}
              style={{ height: "250px", width: "250px" }}
            />
            <p className="upload-here-glow">🚀 Upload Here</p>
          </div>
        )}

        {showProcessingAnim && (
          <div className="processing-box">
            <Player
              autoplay
              loop
              src={processingAnimation}
              style={{ height: "250px", width: "250px" }}
            />
            <p className="glow-text">🔄 Processing...</p>
          </div>
        )}

        {!showProcessingAnim && prediction && (
          <div className="processing-box">
            <Player
              autoplay
              loop
              src={finalAnimation}
              style={{ height: "250px", width: "250px" }}
            />
            <p className="result-glow">🧠 Prediction: {prediction}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
