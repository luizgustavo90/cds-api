import express from 'express'
import cd from './cdsRoutes.js'
import bandas from './bandasRoutes.js'
import auth from './authRoute.js'

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "Curso de Node"})
    })

    app.use(
        express.json(),
        cd,
        bandas,
        auth
    )
}

export default routes