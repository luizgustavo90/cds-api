import express from "express"
import CdsController from "../controller/cdsController.js"

const router = express.Router()

router.get("/cds", CdsController.listarCds)

export default router