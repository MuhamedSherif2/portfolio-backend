import mongoose from 'mongoose'

const mongooseDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB)
        console.log('MongoDB connected successfully');
        
        return connect
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error)
        process.exit(1)
    }
}

export default mongooseDB