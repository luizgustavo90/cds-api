import express from 'express'
import cd from './cdsRoutes.js'
import bandas from './bandasRoutes.js'

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "Curso de Node"})
    })

    app.use(
        express.json(),
        cd,
        bandas
    )
}

export default routes