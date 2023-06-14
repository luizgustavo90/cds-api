import express from "express"
import CdsController from "../controller/cdsController.js"

const router = express.Router()

router.get("/cds", CdsController.listarCds)
router.get("/cds/filtro", CdsController.filtroCds)
router.post("/cds", CdsController.cadastrarCds)
router.put("/cds/:id", CdsController.atualizarCd)
router.delete("/cds/:id", CdsController.deletarCd)

export default router