import Topic from "../model/topicModel.js";
// import Video from "../model/videoModel.js";

// name, description, videos

const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find({},{name:1, _id:1});
        console.log("topics are ", topics)
        // const topicNames = topics.map(topic => topic.name);
        
        res.status(200).json({ message: "Retrieved all topics", topics:topics });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve topics", error: error.message });
    }
};


const getTopicVideos = async (req, res) => {
    const { topic } = req.query;
    console.log("fetching videos ....", topic)
    try {
        // Find the topic by ID and populate the videos

        const topicVideos = await Topic.find({name:topic}).populate('videos', 'title description url duration');
        console.log(topicVideos[0].videos);
        
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        // Respond with the list of videos
        res.status(200).json({ videos: topicVideos[0].videos });

    } catch (error) {
        console.error("Error fetching topic videos:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

const addTopic = async (req, res) => {
    const { name, description } = req.body;

    try {
        const topic = new Topic({
            name,
            description
        });
        await topic.save();
        console.log("Added Topic: ", topic);
        res.status(201).json({ message: "Added topic", topic });
    } catch (error) {
        res.status(500).json({ message: "Failed to add topic", error: error.message });
    }
};

const deleteTopic = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTopic = await Topic.findByIdAndDelete(id);

        if (!deletedTopic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.status(200).json({ message: "Topic deleted successfully", deletedTopic });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete topic", error: error.message });
    }
};

const updateTopic = async (req, res) => {
    const { _id } = req.query;
    const { name, description } = req.body;
    console.log(req.query)

    try {
        const updatedTopic = await Topic.findByIdAndUpdate(
            _id,
            { name, description },
            { new: true } 
        );

        if (!updatedTopic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.status(200).json({ message: "Topic updated successfully", updatedTopic });
    } catch (error) {
        res.status(500).json({ message: "Failed to update topic", error: error.message });
    }
};

export {getTopicVideos, getTopics, addTopic, deleteTopic, updateTopic };
