import Topic from '../model/topicModel.js';
import Video from '../model/videoModel.js';

const uploadAndAddVideo = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const { title, desc: description, prevVideoId, duration, topicId } = req.body;
        const videoPath = req.file ? req.file.path : req.body.url; // Use file path if uploaded, otherwise use URL

        if (!videoPath) {
            return res.status(400).json({ message: "No video file or URL provided" });
        }

        const prevVideo = prevVideoId || null;
        const newVideo = new Video({
            title,
            description,
            url: videoPath,
            prevVideoId: prevVideo,
            duration
        });

        await newVideo.save();


        if (topicId) {
            const updateTopic = await Topic.findByIdAndUpdate(
                topicId,
                { $push: { videos: newVideo._id } }, // Push the video ID to the videos array of the topic
                { new: true }
            );

            if (!updateTopic) {
                return res.status(404).json({ message: "Topic not found" });
            }

            console.log("Updated Topic: ", updateTopic);
        }

        if (prevVideo) {
            await Video.updateOne({ _id: prevVideo }, { $set: { nextVideoId: newVideo._id } });
        }

        res.status(201).json({ message: "Video added successfully", video: newVideo });
    } catch (error) {
        res.status(500).json({ message: "Failed to add video", error: error.message });
    }
};

const getVideo = async (req, res) => {
    const { videoId } = req.query;
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json({ message: "Video successfully retrieved", video });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve video", error: error.message });
    }
};

const updateVideo = async (req, res) => {
    const { _id, title, desc: description, url, prevVideoId, duration } = req.body;
    try {
        const prevVideo = prevVideoId || null;
        const updatedVideo = await Video.updateOne(
            { _id },
            { $set: { title, description, url, prevVideoId: prevVideo, duration } }
        );
        if (updatedVideo.nModified === 0) {
            return res.status(404).json({ message: "Video not found or no changes made" });
        }
        res.status(200).json({ message: "Video updated successfully", video: updatedVideo });
    } catch (error) {
        res.status(500).json({ message: "Failed to update video", error: error.message });
    }
};

export { getVideo, uploadAndAddVideo as addVideo, updateVideo };
