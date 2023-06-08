import express from "express"
import db from "./config/db.js"
import cds from "./models/Cds.js"
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, "Erro de conexão"))
db.once("open", () => {
    console.log("Conexão com banco feito com sucesso")
})
const app = express()

app.use(express.json())

routes(app)

// const cds = [
//     {
//         id: 1,
//         album: "meteora",
//         banda: "linkin park"
//     },
//     {
//         id: 2,
//         album: "the best of 1990-2000",
//         banda: "u2"
//     }
// ]

app.get('/cds/:id', (req, res) => {
    const index = buscaCd(req.params.id)

    res.json(cds[index])
})

app.post('/cds', (req, res) => {
    cds.push(req.body)
    res.status(201).send('cd cadastrado')
})

app.put('/cds/:id', (req, res) => {
    const id = req.params.id
    const index = buscaCd(id)

    if (req.body.album) {
        cds[index].album = req.body.album
    }
    if (req.body.banda) {
        cds[index].banda = req.body.banda
    }
    res.json(cds)
})

app.delete('/cds/:id', (req, res) => {
    const { id } = req.params
    const index = buscaCd({ id })
    cds.splice(index, 1)
    res.json(`CD ${id} removido com sucesso!`)
})

function buscaCd(id) {
    return cds.findIndex(cd => cd.id == id)
}

export default app