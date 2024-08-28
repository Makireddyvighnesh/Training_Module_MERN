import { useRef, useLayoutEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import axios from 'axios';

function VideoContent({ video, topic, userId }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const localStorageKey = `video-${video.url}`; // Unique key for local storage

  const convertToUrl = (videoPath) => {
    const fileName = videoPath.split('\\').pop();
    return `http://localhost:5000/uploads/${fileName}`; // Adjust the URL as needed
  };

  const videoUrl = convertToUrl(video.url);

  useLayoutEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Dispose of the existing player if it exists
      if (playerRef.current) {
        playerRef.current.dispose();
      }

      // Initialize Video.js player without the progress control
      playerRef.current = videojs(videoElement, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{ src: videoUrl, type: 'video/mp4' }],
        controlBar: {
          progressControl: false, // Hide the seek bar
        },
      });

      // Retrieve the last saved time from local storage
      const lastSavedTime = localStorage.getItem(localStorageKey);
      if (lastSavedTime) {
        playerRef.current.currentTime(parseFloat(lastSavedTime)); // Start from the last saved time
      }

      // Track time updates to store the current time
      playerRef.current.on('timeupdate', () => {
        const currentTime = playerRef.current.currentTime();
        localStorage.setItem(localStorageKey, currentTime); // Save current time in local storage
      });

      // Listen for the 'ended' event
      playerRef.current.on('ended', () => {
        const currentTime = playerRef.current.currentTime();
        const videoDuration = playerRef.current.duration(); // Get the video duration

        // Prepare the data to send to the server
        const data = {
          userId: userId,          // User ID
          topicName:topic,
          videoId: video._id,       // Video ID
          currentTime: currentTime, // Current playback time
          videoDuration: videoDuration // Total video duration
        };

        // Make a request to the server to indicate the video is completed
        axios.post('http://localhost:5000/api/progress/updateProgressAndCompletedVideos', data)
          .then((response) => {
            console.log('Video completion recorded:', response.data);
          })
          .catch((error) => {
            console.error('Error recording video completion:', error);
          });
      });

      // Cleanup function to dispose of the player when the component unmounts
      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null; // Clear the reference
        }
      };
    }
  }, [videoUrl, userId, topic]); // Re-run the effect when videoUrl, userId, or topicId changes

  return (
    <div className="video-container">
      <div style={{ display: 'flex', color: 'blue', alignItems: 'center' }}>
        <p style={{ marginRight: '10px' }}>{topic}</p>
        <span style={{ fontSize: '20px', marginRight: '10px' }}> &gt; </span>
        <p>{video.title}</p>
      </div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoContent;