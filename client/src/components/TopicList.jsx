import './App.css'; 

function TopicList({ topics, activeTopic, onTopicSelect, onVideoSelect }) {
  const topic = topics.find(t => t === activeTopic);
  console.log("topic ",topic)

  return (
    <div className="topic-list">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            <h3
              onClick={() => onTopicSelect(topic)}
              style={{ cursor: 'pointer', fontWeight: topic === activeTopic ? 'bold' : 'normal' }}
            >
              {topic}
            </h3>
            {topic.name === activeTopic && (
              <ul className="video-list">
                {topic.videos.map((video) => (
                  <li key={video._id}>
                    <button onClick={() => onVideoSelect(video)}>{video.title}</button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicList;
