import bandas from "../models/Bandas.js"
import cds from "../models/Cds.js"
import mongoose from "mongoose"
import { tokenRegistered } from "./tokenJwt.js"

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
            detail: "Falha ao cadastrar CD: por favor insira um ID válido de BANDA"
        }
        console.log("error", error)
        throw error
    }

}

async function tokenValidation(token) {    
    let error = {}

    if (!token) {
        error = {
            status: 401,
            message: "Token näo fornecido",
            detail: "O Token näo foi fornecido"
        }
        throw error

    }

    let tokenWitBearer = token.replace(/^Bearer\s+/, "");

    if (tokenWitBearer != tokenRegistered) {
        error = {
            status: 401,
            message: "Token inválido",
            detail: "O Token fornecido está inválido"
        }
        throw error
    }

}

async function validateIdCd(id) {
    var checkId = mongoose.Types.ObjectId.isValid(id)
    let error = {}

    if (!checkId) {
        error = {
            status: 404,
            message: "ID não encontrado",
            detail: "Falha ao alterar/deletar CD: o ID do CD não foi encontrado"
        }
        throw error
    }
    const buscaId = await cds.findById(id)
    if (!buscaId) {
        error = {
            status: 404,
            message: "ID não encontrado",
            detail: "Falha ao alterar/deletar CD: o ID do CD não foi encontrado"
        }
        throw error
    }

}

async function validateIdBanda(id) {
    var checkId = mongoose.Types.ObjectId.isValid(id)
    let error = {}

    if (!checkId) {
        error = {
            status: 404,
            message: "ID não encontrado",
            detail: "Falha ao inserir/alterar/deletar BANDA: o ID da BANDA não foi encontrado"
        }
        throw error
    }
    const buscaId = await bandas.findById(id)
    if (!buscaId) {
        error = {
            status: 404,
            message: "ID não encontrado",
            detail: "Falha ao inserir/alterar/deletar BANDA: o ID da BANDA não foi encontrado"
        }
        throw error
    }

}

export { validate, tokenValidation, validateIdCd, validateIdBanda }