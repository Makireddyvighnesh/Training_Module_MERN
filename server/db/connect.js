import mongoose from 'mongoose';

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/video')
        // console.log(process.env.MONGODB_URI)
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;