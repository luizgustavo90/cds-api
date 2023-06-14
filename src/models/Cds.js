import mongoose, { Schema } from 'mongoose'

const cdSchema = new mongoose.Schema(
    {
        id: { type: String },
        album: { type: String, required: true },
        banda: { type: String, required: true },
        ano: { type: Number }
    },
    {
        versionKey: false
    }
)
const cds = mongoose.model('cd', cdSchema, 'cd' )

export default cds