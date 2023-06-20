import bandas from "../models/Bandas"
import { describe, expect, it, jest } from '@jest/globals'
import BandasController from "../controller/bandasController"

describe('bandasController', () => {
    let sut = BandasController

    it ('Deve retonar a lista de bandas', async () => {
        const params = {}
        const dataReturn = await sut.listarBandas(params)
        expect(dataReturn.data.length).toBeGreaterThan(0)
    },15000)

})