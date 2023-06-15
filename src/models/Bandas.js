import mongoose from 'mongoose'

const bandaSchema = new mongoose.Schema(
    {
        banda: { type: String, required: true },
        integrantes: [{
            nome: { type: String, require:true }
        }]
    },
    {
        versionKey: false
    }
)
const bandas = mongoose.model('bandas', bandaSchema, 'bandas' )

export default bandas