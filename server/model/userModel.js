import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

// Define your videoProgressSchema and topicSchema as before
const videoProgressSchema = mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    lastPosition: {
        type: Number, 
        default: 0
    },
    watchedAt: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false,
});

const topicSchema = mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    videos: [videoProgressSchema] 
}, {
    _id: false,
});

// Define the User schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'user', // Default role is 'user'
    },
    password: {
        type: String,
        required: true,
    },
    topics: [topicSchema],
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
}, {
    timestamps: true,
});

// Add the middleware to exclude fields for admins
userSchema.pre('save', function (next) {
    if (this.role === 'admin') {
        this.progress = undefined;
        this.completedVideos = undefined;
        this.topics = undefined;
    }
    next();
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);
export default User;
