import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error', err));

export default mongoose;
