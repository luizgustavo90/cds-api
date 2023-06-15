import cds from '../models/Cds.js'
import {filtroCd} from '../helpers/filter.js'
import { validate, validateIdBanda, validateIdCd } from '../helpers/validations.js'
import { notFound } from '../helpers/errors.js'

class CdsController {
    static listarCds = async (req, res) => {
        try {
            const cdsResultado = await cds.find().populate('banda').exec()
            const resultadoBusca = res.status(200).json(cdsResultado)
            return resultadoBusca


        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }
    }

    static filtroCds = async (req, res) => {
        try {
            let retornoFiltro = await filtroCd(req.query)
            let resultadoFiltro = res.status(200).json(retornoFiltro)
            return resultadoFiltro

        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }

    }

    static cadastrarCds = async (req, res) => {
        try {
            validate(req)
            let cdNovo = new cds(req.body)
            return cdNovo.save(res.status(200).json({ message: `CD novo salvo! ID: ${cdNovo._id}` }))

        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }
    }

    static atualizarCd = async (req, res) => {
        try {
            await validateIdCd(req.params.id)
            await validateIdBanda(req.body.id)
            const id = req.params.id
            const updateInfo = req.body

            await cds.findByIdAndUpdate(id, updateInfo).exec()
            const confirmation = res.status(200).json({ message: `CD de Id: ${id} atualizado!` })
            return confirmation

        } catch (err) {
            return res.status(err.status).json(notFound(err))
        }
    }

    static deletarCd = async (req, res) => {
        try {
            await validateIdCd(req.params.id)
            const id = req.params.id

            await cds.findByIdAndDelete(id).exec()
            const confirmation = res.status(200).json({ message: `CD removido com sucesso!` })
            return confirmation

        } catch (err) {
            return res.status(err.status).json(notFound(err))

        }
    }
}
export default CdsController