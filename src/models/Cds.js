import mongoose from 'mongoose'

const cdSchema = new mongoose.Schema(
    {
        id: { type: String },
        album: { type: String, required: true },
        ano: { type: Number },
        banda: {type: mongoose.Schema.Types.ObjectId, ref: 'bandas', required: true},
    },
    {
        versionKey: false
    }
)
const cds = mongoose.model('cd', cdSchema, 'cd' )

export default cds