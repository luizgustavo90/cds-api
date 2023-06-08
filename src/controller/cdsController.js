import cds from '../models/Cds.js'

class CdsController {
    static listarCds = async (req, res) => {
        try {
            const cdsResultado = await cds.find()
            console.log ("RESULTADO ->", cdsResultado)
            res.status(200).json(cdsResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
export default CdsController