import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video' ,
    default:[]
  }]
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
