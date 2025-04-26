import React, { useState } from "react";
import { FiUpload, FiVideo, FiSearch, FiGrid } from "react-icons/fi";
import "./App.css";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [aiScore, setAiScore] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setTimeout(() => {
        setUploadingImage(false);
      }, 1200);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingVideo(true);
      const videoUrl = URL.createObjectURL(file);
      setSelectedVideo(videoUrl);
      setTimeout(() => {
        setUploadingVideo(false);
      }, 1200);
    }
  };

  const handleScan = () => {
    const randomScore = Math.floor(Math.random() * 100);
    setAiScore(randomScore);
  };

  const handleFindAlternatives = () => {
    document.querySelector('[data-testid="media-tab"]')?.click();
  };

  return (
    <div className="container">
      <h1 className="logo">✨ Ethical Lens ✨</h1>
      <p className="motto">Scan First. Share Fearlessly.</p>

      <div className="button-group">
        <label className="upload-button">
          <FiUpload className="button-icon" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>

        <label className="upload-button">
          <FiVideo className="button-icon" />
          Upload Video
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleVideoUpload}
          />
        </label>

        <button className="action-button" onClick={handleScan}>
          <FiSearch className="button-icon" />
          Scan Now
        </button>

        <button className="action-button" onClick={handleFindAlternatives}>
          <FiGrid className="button-icon" />
          Find Alternatives
        </button>
      </div>

      {uploadingImage && <p className="uploading-text">Uploading image...</p>}
      {uploadingVideo && <p className="uploading-text">Uploading video...</p>}

      {selectedImage && (
        <img src={selectedImage} alt="Preview" className="preview" />
      )}
      {selectedVideo && (
        <video src={selectedVideo} controls className="preview" />
      )}

      <div className="ai-meter">
        <p className="ai-text"><strong>AI Detection:</strong></p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${aiScore}%` }}
          ></div>
        </div>
        <p className="score-text">{aiScore}% AI Detected</p>
      </div>
    </div>
  );
};

export default App;





