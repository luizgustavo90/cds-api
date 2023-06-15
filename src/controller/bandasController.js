import bandas from '../models/Bandas.js'
import {filtroBanda} from '../helpers/filter.js'
import { notFound } from '../helpers/errors.js'
import { validateIdBanda } from '../helpers/validations.js'

class BandasController {
    static listarBandas = async (req, res) => {
        try {
            const bandasResultado = await bandas.find()
            const resultadoBusca = res.status(200).json(bandasResultado)
            return resultadoBusca


        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }
    }

    static filtroBandas = async (req, res) => {
        try {
            let retornoFiltro = await filtroBanda(req.query)
            let resultadoFiltro = res.status(200).json(retornoFiltro)
            return resultadoFiltro

        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }

    }

    static cadastrarBandas = async (req, res) => {
        try {
            let cdNovo = new bandas(req.body)
            return cdNovo.save(res.status(200).json({ message: `Banda nova salvo! ID: ${cdNovo._id}` }))

        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }
    }

    static atualizarBanda = async (req, res) => {
        try {
            await validateIdBanda(req.params.id)
            const id = req.params.id
            const updateInfo = req.body

            await bandas.findByIdAndUpdate(id, updateInfo).exec()
            const confirmation = res.status(200).json({ message: `Banda de Id: ${id} atualizado!` })
            return confirmation

        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }
    }

    static deletarBanda = async (req, res) => {
        try {
            await validateIdBanda(req.params.id)
            const id = req.params.id

            await bandas.findByIdAndDelete(id).exec()
            const confirmation = res.status(200).json({ message: `Banda removida com sucesso!` })
            return confirmation

        } catch (err) {
            return res.status(err.status).json(notFound(err))

        }
    }

    static deletarIntegrante = async(req,res) => {
        try {
            const id = req.params.id

            await bandas.findByIdAndDelete(id).exec()
            const confirmation = res.status(200).json({ message: `Integrante removido com sucesso!` })
            return confirmation

        } catch (err) {
            return res.status(err.status).json(notFound(err))

        }

    }
}
export default BandasController