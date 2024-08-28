import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    url:{
        type:String,
        required:true,
        trim:true,
    },
    nextVideoId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Video'
    },
    prevVideoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
        default:''
    },
    duration:{
        type:String,
        required:true,
        default:''
    }

});

const Video = mongoose.model('Video', videoSchema);

export default Video;