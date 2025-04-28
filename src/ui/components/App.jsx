import React, { useState } from 'react';
import './App.css';
import { FaUpload, FaVideo, FaSearch, FaThLarge } from 'react-icons/fa';
import { doFullScan } from "./utils/doScan"; 

function App() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [aiScore, setAiScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImagePreview(URL.createObjectURL(uploadedFile));
      setVideoPreview(null); // Clear video if uploading image
    }
  };

  const handleVideoUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(null); // We are not scanning videos
      setVideoPreview(URL.createObjectURL(uploadedFile));
      setImagePreview(null); // Clear image if uploading video
    }
  };

  const handleScan = async () => {
    if (!file) {
      alert("Please upload an image to scan.");
      return;
    }
    setLoading(true);
    try {
      const scanResult = await doFullScan(file);
      setAiScore(scanResult.aiSuspicionScore || 0);
    } catch (error) {
      console.error("Scan failed:", error);
      alert("Scan failed. Check console.");
    } finally {
      setLoading(false);
    }
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

        <button className="action-button" onClick={handleScan} disabled={loading}>
          <FaSearch className="icon" />
          {loading ? "Scanning..." : "Scan Now"}
        </button>

        <button className="action-button">
          <FaThLarge className="icon" />
          Find Alternatives
        </button>
      </div>

      <div className="ai-meter">
        <div className="meter-label">AI Detection:</div>
        <div className="meter-bar">
          <div
            className="meter-progress"
            style={{ 
              width: `${aiScore}%`,
              backgroundColor: getMeterColor(aiScore)
            }}
          ></div>
        </div>
        <div className="meter-score">{aiScore}% AI Detected</div>
      </div>
    </div>
  );
}

// Helper function to change the meter color
function getMeterColor(score) {
  if (score >= 70) return "#dc2626"; // Red
  if (score >= 40) return "#f59e0b"; // Orange
  return "#16a34a"; // Green
}

export default App;
