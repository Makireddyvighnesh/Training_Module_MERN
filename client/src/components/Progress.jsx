import React from 'react';

function ProgressPopup() {
  // Retrieve progress data from localStorage
  const completedVideos = JSON.parse(localStorage.getItem('completedVideos')) || [];
  const pendingVideos = JSON.parse(localStorage.getItem('pendingVideos')) || [];
  
  // Calculate progress percentage
  const totalVideos = completedVideos.length + pendingVideos.length;
  const completedPercentage = totalVideos > 0 ? (completedVideos.length / totalVideos) * 100 : 0;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Learning Progress</h1>
      <p>Total Videos: {totalVideos}</p>
      <p>Completed Videos: {completedVideos.length}</p>
      <p>Pending Videos: {pendingVideos.length}</p>
      <p>Progress: {completedPercentage.toFixed(2)}%</p>
    </div>
  );
}

export default ProgressPopup;
