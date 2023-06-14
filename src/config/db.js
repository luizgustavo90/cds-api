import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION)
let db = mongoose.connection

export default db