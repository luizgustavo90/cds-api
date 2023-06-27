import express from "express"
import AutenticarController from "../controller/authController.js"

const router = express.Router()

router.post ("/auth", AutenticarController.autenticaUsuario)

export default router