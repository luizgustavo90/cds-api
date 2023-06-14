import cds from "../models/Cds.js"
import mongoose from "mongoose"

function validate(req) {
    let error = {}
    if (!req.body.album) {
        error = {
            status: 404,
            message: "ALBUM não encontrado",
            detail: "Falha ao cadastrar CD: o ALBUM não está preenchido, informação faltando"
        }
        console.log("error", error)
        throw error
    }
    if (!req.body.banda) {
        error = {
            status: 404,
            message: "BANDA não encontrada",
            detail: "Falha ao cadastrar CD: a BANDA não está preenchida, informação faltando"
        }
        console.log("error", error)
        throw error
    }

}

async function validateId(id) {
    var checkId = mongoose.Types.ObjectId.isValid(id)
    let error = {}

    if (!checkId) {
        error = {
            status: 404,
            message: "ID não encontrado",
            detail: "Falha ao alterar/deletar CD: o ID não foi encontrado"
        }
        throw error
    }
    const buscaId = await cds.findById(id)
    if (!buscaId) {
        error = {
            status: 404,
            message: "ID não encontrado",
            detail: "Falha ao alterar/deletar CD: o ID não foi encontrado"
        }
        throw error
    }

}

export { validate, validateId }