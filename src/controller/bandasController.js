import bandas from '../models/Bandas.js'
import { filtroBanda } from '../helpers/filter.js'
import { validateIdBanda } from '../helpers/validations.js'
import {returnModel, returnModelErr} from '../helpers/return.js'

class BandasController {
    static listarBandas = async (req, res) => {
        try {
            const bandasResultado = await bandas.find()
            const type = "success"
            return returnModel(res,type,bandasResultado)

        } catch (err) {
            return returnModelErr (res,err)
        }
    }

    static filtroBandas = async (req, res) => {
        try {
            let retornoFiltro = await filtroBanda(req.query)
            const type = "success"
            return returnModel(res,type,retornoFiltro)

        } catch (err) {
            return returnModelErr (res,err)
        }

    }

    static cadastrarBandas = async (req, res) => {
        try {
            let bandaNova = new bandas(req.body)
            bandaNova.save()
            const type = "success-message"
            const mensagem = `Banda nova salvo! ID: ${bandaNova._id}`
            const params = ''
            console.log(mensagem)
            return returnModel(res,type,params,mensagem)

        } catch (err) {
            return returnModelErr (res,err)
        }
    }

    static atualizarBanda = async (req, res) => {
        try {
            await validateIdBanda(req.params.id)
            const id = req.params.id
            const updateInfo = req.body

            await bandas.findByIdAndUpdate(id, updateInfo).exec()
            const type = "success-message"
            const mensagem = `Banda de Id: ${id} atualizado!`
            const params = ''
            return returnModel(res,type,params,mensagem)

        } catch (err) {
            return returnModelErr (res,err)
        }
    }

    static deletarBanda = async (req, res) => {
        try {
            await validateIdBanda(req.params.id)
            const id = req.params.id

            await bandas.findByIdAndDelete(id).exec()
            const type = "success-message"
            const mensagem = `Banda removida com sucesso!`
            const params = ''
            return returnModel(res,type,params,mensagem)

        } catch (err) {
           return returnModelErr(res,err)

        }
    }

    static deletarIntegrante = async (req, res) => {
        try {
            await validateIdBanda(req.params.idBanda)

            const idBanda = req.params.idBanda
            const idIntegrante = req.params.idIntegrante

            await bandas.findOneAndUpdate(
                { _id: idBanda },
                { $pull: { integrantes: { _id: idIntegrante } } },
                { safe: true, multi: false }
              );

            const type = "success-message"
            const mensagem = `Integrante de ID ${idIntegrante} removido com sucesso!`
            const params = ''

            return returnModel(res,type,params,mensagem)

        } catch (err) {
            return returnModelErr (res,err)

        }

    }

    static inserirIntegrante = async (req,res) => {
        try {
            await validateIdBanda(req.params.idBanda)

            const idBanda = req.params.idBanda
            const nomeIntegrante = req.params.nomeIntegrante

            await bandas.findOneAndUpdate(
                { _id: idBanda },
                { $push: { integrantes: { nome: nomeIntegrante } } },
              );

            const type = "success-message"
            const mensagem = `Integrante ${nomeIntegrante} foi adicionado na BANDA com sucesso!`
            const params = ''

            return returnModel(res,type,params,mensagem)

        } catch (err) {
            return returnModelErr (res,err)

        } 
    }
}
export default BandasController