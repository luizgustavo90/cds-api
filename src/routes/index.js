import express from 'express'
import cd from './cdsRoutes.js'

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "Curso de Node"})
    })

    app.use(
        express.json(),
        cd
    )
}

export default routes