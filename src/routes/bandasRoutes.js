import express from "express"
import BandasController from "../controller/bandasController.js"

const router = express.Router()

router.get("/bandas", BandasController.listarBandas)
router.get("/bandas/filtro", BandasController.filtroBandas)
router.post("/bandas", BandasController.cadastrarBandas)
router.put("/bandas/:id", BandasController.atualizarBanda)
router.delete("/bandas/:id", BandasController.deletarBanda)
router.delete("/bandas/integrante/:idBanda/:idIntegrante", BandasController.deletarIntegrante)
router.post ("/bandas/integrante/:idBanda/:nomeIntegrante", BandasController.inserirIntegrante)

export default router