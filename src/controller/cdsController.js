import cds from '../models/Cds.js'
import {filtroCd} from '../helpers/filter.js'
import { validate, validateIdBanda, validateIdCd, tokenValidation } from '../helpers/validations.js'
import {returnModel, returnModelErr} from '../helpers/return.js'

class CdsController {
    static listarCds = async (req, res) => {
        try {
            await tokenValidation(req.headers.authorization)
            const cdsResultado = await cds.find().populate('banda').exec()
            const type = "success"
            return returnModel(res,type,cdsResultado)


        } catch (err) {
            return returnModelErr (res,err)
        }
    }

    static filtroCds = async (req, res) => {
        try {
            await tokenValidation(req.headers.authorization)
            let retornoFiltro = await filtroCd(req.query)
            const type = "success"
            return returnModel(res,type,retornoFiltro)

        } catch (err) {
            return returnModelErr (res,err)
        }

    }

    static cadastrarCds = async (req, res) => {
        try {
            await tokenValidation(req.headers.authorization)
            validate(req)
            await validateIdBanda(req.body.banda)

            let cdNovo = new cds(req.body)
            cdNovo.save()
            const type = "success-message"
            const mensagem = `CD novo salvo! ID: ${cdNovo._id}` 
            const params = ''
            return returnModel(res,type,params,mensagem)

        } catch (err) {
            return returnModelErr (res,err)
        }
    }

    static atualizarCd = async (req, res) => {
        try {
            await tokenValidation(req.headers.authorization)
            await validateIdCd(req.params.id)
            await validateIdBanda(req.body.banda)
            const id = req.params.id
            const updateInfo = req.body

            await cds.findByIdAndUpdate(id, updateInfo).exec()
            const type = "success-message"
            const mensagem = `CD de Id: ${id} atualizado!`
            const params = ''
            return returnModel(res,type,params,mensagem)

        } catch (err) {
            return returnModelErr (res,err)
        }
    }

    static deletarCd = async (req, res) => {
        try {
            await tokenValidation(req.headers.authorization)
            await validateIdCd(req.params.id)
            const id = req.params.id

            await cds.findByIdAndDelete(id).exec()
            const type = "success-message"
            const mensagem = `CD removido com sucesso!`
            const params = ''
            return returnModel(res,type,params,mensagem)

        } catch (err) {
            return returnModelErr(res,err)

        }
    }
}
export default CdsController