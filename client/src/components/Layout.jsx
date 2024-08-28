import { useState, useEffect } from 'react';
import { fetchCompletedTopics, fetchTopics, fetchVideos } from '../services/topicService.js';
import VideoContent from './VideoContent.jsx';
import './Layout.css';

const user = JSON.parse(localStorage.getItem('user'));

function Layout() {
  const [topics, setTopics] = useState([]);
  const [topicVideos, setTopicVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");

  const [completedVideos, setCompletedVideos] = useState([]);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [pendingVideos, setPendingVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const topicsData = await fetchTopics();
      setTopics(topicsData);
    };

    const fetchProgress = async() => {
      const { topicIds, videoIds, pendingVideosIds } = await fetchCompletedTopics();
      localStorage.setItem('topicIds', JSON.stringify(topicIds));
      localStorage.setItem('completedVideos', JSON.stringify(videoIds));
      localStorage.setItem('pendingVideos', JSON.stringify(pendingVideosIds));

      setCompletedTopics(topicIds);
      setCompletedVideos(videoIds);
      setPendingVideos(pendingVideosIds);
    }

    fetchData();
    fetchProgress();
  }, []);

  const handleTopicSelect = async (topic) => {
    const response = await fetchVideos(topic);
    setTopicVideos(response.data.videos); 
    setSelectedTopic(topic);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const isVideoUnlocked = (videoId) => {
    return completedVideos.includes(videoId) || pendingVideos[0] === videoId;
  };

  return (
    <div className="layout-container">
      <div className="topics-list">
        <h2>Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic._id}>
              <h3 onClick={() => handleTopicSelect(topic.name)} style={{ cursor: 'pointer' }}>
                {topic.name}
              </h3>
              {selectedTopic === topic.name && topicVideos.length > 0 && (
                <ul>
                  {topicVideos.map((video, index) => (
                    <li key={video._id}>
                      <button
                        onClick={() => isVideoUnlocked(video._id) && handleVideoSelect(video)}
                        title={video.description}
                        style={{ cursor: isVideoUnlocked(video._id) ? 'pointer' : 'not-allowed' }}
                        disabled={!isVideoUnlocked(video._id)} // Disable if not unlocked
                      >
                        {video.title}
                        {completedVideos.includes(video._id) && (
                          <span
                            style={{
                              display: 'inline-block',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: '#00FF00',
                              color: '#FFFFFF',
                              textAlign: 'center',
                              lineHeight: '20px',
                              marginLeft: '8px',
                            }}
                          >
                            ✔
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="video-player-container" style={{ backgroundColor: "white" }}>
        {selectedVideo ? (
          <VideoContent video={selectedVideo} topic={selectedTopic} userId={user._id} />
        ) : (
          <p>Select a topic and a video to watch.</p>
        )}
      </div>
    </div>
  );
}

export default Layout;
