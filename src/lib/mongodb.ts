import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI! as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

//Khai báo cache, có hoặc chưa có trong global đều ổn
const cached = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB() {
    // nếu đã có connection sẵn, trả luôn
    if (cached.conn) return cached.conn;

    // nếu chưa có promise connect, tạo mới
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'education_hub_db',
        });
    }

    // đợi promise xong và cache lại
    cached.conn = await cached.promise;
    return cached.conn;
}
