import React, { useState } from 'react';
import './App.css';
import { FaUpload, FaVideo, FaSearch, FaThLarge } from 'react-icons/fa';

function App() {
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [aiScore, setAiScore] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleScan = () => {
    const randomScore = Math.floor(Math.random() * 100);
    setAiScore(randomScore);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">Ethical Lens</h1>
        <p className="subtitle"><i>Scan First. Share Fearlessly.</i></p>
      </div>

      <div className="button-group">
        <label className="upload-button">
          <FaUpload className="icon" />
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>
        {imagePreview && (
          <img src={imagePreview} alt="Uploaded Preview" className="preview-image" />
        )}

        <label className="upload-button">
          <FaVideo className="icon" />
          Upload Video
          <input type="file" accept="video/*" onChange={handleVideoUpload} hidden />
        </label>
        {videoPreview && (
          <video src={videoPreview} controls className="preview-video" />
        )}

        <button className="action-button" onClick={handleScan}>
          <FaSearch className="icon" />
          Scan Now
        </button>

        <button className="action-button">
          <FaThLarge className="icon" />
          Find Alternatives
        </button>
      </div>

      <div className="ai-meter">
        <div className="meter-label">AI Detection:</div>
        <div className="meter-bar">
          <div className="meter-progress" style={{ width: `${aiScore}%` }}></div>
        </div>
        <div className="meter-score">{aiScore}% AI Detected</div>
      </div>
    </div>
  );
}

export default App;







