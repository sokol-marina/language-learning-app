import React from 'react';
import '../styles/ProgressBar.css';
const ProgressBar = ({ total, memorized }) => {
  const progress = total > 0 ? Math.round((memorized / total) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-label">
        Memorized: {memorized} / {total} ({progress}%)
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
