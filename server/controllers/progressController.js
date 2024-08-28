import Topic from "../model/topicModel.js";
import User from "../model/userModel.js";

const getUserProgress = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Retrieve all topics and their associated videos
        const topics = await Topic.find({});
        // Extract completed topic IDs and video IDs from the user schema
        const completedTopicIds = user.topics.map(topic => topic.topicId.toString());
        const completedVideoIds = user.topics.flatMap(topic =>
            topic.videos.map(video => video.videoId.toString())
        );

        // Get pending videos (videos not completed)
        const pendingVideos = topics.flatMap(topic =>
            topic.videos.filter(videoId => !completedVideoIds.includes(videoId.toString()))
        );

        return res.status(200).json({
            message: "User progress retrieved",
            topicIds: completedTopicIds,
            videoIds: completedVideoIds,
            pendingVideosIds:pendingVideos
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateProgressAndCompletedVideos = async (req, res) => {
    const { userId, topicName, videoId, currentTime, videoDuration } = req.body;

    console.log(req.body);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("updateProgressAndCompletedVideos......")

        const topicId = await Topic.findOne({name:topicName}, {_id:1});

        let topic = user.topics.find(topic => topic.topicId.toString() === topicId);
        if (!topic) {
            topic = {
                topicId,
                videos: [{
                    videoId,
                    lastPosition: currentTime,
                    watchedAt: Date.now()
                }]
            };
            user.topics.push(topic);
        } else {
            let videoProgress = topic.videos.find(video => video.videoId.toString() === videoId);
            console.log("videoProgress: ", videoProgress);
            if (videoProgress) {
                videoProgress.lastPosition = currentTime;
                videoProgress.watchedAt = Date.now();
            } else {
                topic.videos.push({
                    videoId,
                    lastPosition: currentTime,
                    watchedAt: Date.now()
                });
            }
        }

        // Check if the video should be added to completedVideos
        if (videoDuration && currentTime >= videoDuration) { // Ensure `videoDuration` is provided
            if (!user.completedVideos.includes(videoId)) {
                user.completedVideos.push(videoId);
            }
        }

        await user.save();
        res.status(200).json({ message: "Progress updated and completed videos checked successfully", completedVideos: user.completedVideos });
    } catch (error) {
        console.error("Error updating progress and completed videos:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


export {getUserProgress, updateProgressAndCompletedVideos };
