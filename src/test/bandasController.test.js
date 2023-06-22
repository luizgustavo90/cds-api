import { describe, expect, it, jest } from '@jest/globals'
import BandasController from "../controller/bandasController"
import { request, response } from 'express'
import bandas from '../models/Bandas'
import { returnModel,returnModelErr } from '../helpers'

describe('bandasController', () => {
    let sut = BandasController
    const req = request
    const res = response

    it('Deve retonar a lista de bandas', async () => {
        bandas.find = jest.fn(() => [
            {
                _id: "648f197dcfc4984f5fe9813a",
                banda: "xuxa",
                integrantes: [{
                    nome: "ela mesma",
                    _id: "648f197dcfc4984f5fe9813b"
                }, {
                    nome: "tia da xuxa de novo",
                    _id: "648f19e4cfc4984f5fe9816a"
                }
                ],

            }
        ])

        returnModel = jest.fn(() =>[
            
        ])

        const dataReturn = await sut.listarBandas(req,res)
        expect(dataReturn.data.lengh).toBeGreaterThan(0)
    })

})  