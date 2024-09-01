import axios from 'axios';

const API_URL = 'http://localhost:5000/api/topic'; 

export const fetchTopics = async () => {
  try {
    const response = await axios.get(API_URL,{
        withCredentials:true,
    }); 
    console.log(response.data.topics)
    return response.data.topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

export const fetchVideos = async(topic) => {
    try {
        console.log("Fetching topic Videos.....", topic)
        const response = await axios.get(`${API_URL}/getTopicVideos?topic=${topic}`, {
            withCredentials:true
        });
        return response;

    } catch (error) {
        console.log(error)
    }
}


export const fetchCompletedTopics = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/progress/getUserProgress', {
      withCredentials: true
    });
    console.log(response.data);

    const { topicIds, videoIds,pendingVideosIds } = response.data; // Destructure the necessary data
    return { topicIds, videoIds,pendingVideosIds }; // Return an object containing both topicIds and videoIds

  } catch (error) {
    console.log("Error in fetching completed topics", error);
  }
};
