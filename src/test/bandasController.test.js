import { describe, expect, it, jest } from "@jest/globals";
import BandasController from "../controller/bandasController";
import bandas from "../models/Bandas";


describe("bandasController", () => {
    jest.useFakeTimers();
    let sut = BandasController;

    it("Deve retonar a lista de bandas", async () => {
        const req = {};
        const retornoBanco = [
            {
                _id: "648f197dcfc4984f5fe9813a",
                banda: "banda 1",
                integrantes: [
                    {
                        nome: "ela mesma",
                        _id: "648f197dcfc4984f5fe9813b",
                    },
                    {
                        nome: "outro integrante",
                        _id: "648f19e4cfc4984f5fe9816a",
                    },
                ],
            },
        ];
        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        bandas.find = jest.fn(() => retornoBanco);
        const response = await sut.listarBandas(req, res);
        expect(response).toHaveLength(1);
    });

    it('Deve retornar a lista de bandas filtradas', async () => {
        const req = {
            query: {
                banda: "banda um"
            }
        }
        const retornoBanco = [
            {
                _id: "648f197dcfc4984f5fe9813a",
                banda: "banda um",
                integrantes: [
                    {
                        nome: "ela mesma",
                        _id: "648f197dcfc4984f5fe9813b",
                    },
                    {
                        nome: "outro integrante",
                        _id: "648f19e4cfc4984f5fe9816a",
                    },
                    {
                        nome: "tio",
                        _id: "648f19e4cfc4984f5fe7716a",
                    }
                ],
            },
        ]
        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        bandas.filtroBanda = jest.fn(() => retornoBanco)
        const response = await sut.filtroBandas(req, res)
        expect(response).toEqual(retornoBanco)
    })

    it('Deve retornar OK quando inserir uma banda', async () => {
        const req = {
            body: {
                banda: "banda um",
                integrantes: [
                    {
                        nome: "ela mesma",
                    },
                    {
                        nome: "tia da xuxa de novo",
                    },
                    {
                        nome: "tio",
                    }
                ],
            }
        }
        const retornoBanco = {message: `Banda nova salvo! ID: 546545445`}

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        let bandaNova = new bandas(req.body) 
        bandaNova.save= jest.fn(() => retornoBanco)
        const response = await sut.cadastrarBandas(req, res)
        expect(response).toEqual(retornoBanco)
    })

    it('Deve retornar OK quando atualizar uma banda', async () => {
        const req = {
            body: {
                banda: "banda um",
                integrantes: [
                    {
                        nome: "ela mesma",
                    },
                    {
                        nome: "tia da xuxa de novo",
                    },
                    {
                        nome: "tio",
                    }
                ],
            },


        }
        const retornoBanco = {message: `Banda de ID: 546545445 atualizado!`}

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        bandas.findByIdAndUpdate = jest.fn(() => retornoBanco)
        const response = await sut.atualizarBanda(req, res)
        expect(response).toEqual(retornoBanco)
    })

    it('Deve retornar OK quando deletar uma banda', async () => {
        const req = {
            params: {
                id: "64945a44a4b9e8542f31"
            }
        }
        const retornoBanco = {message: `Banda removida com sucesso!`}

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        bandas.findByIdAndDelete = jest.fn(() => retornoBanco)
        const response = await sut.deletarBanda(req, res)
        expect(response).toEqual(retornoBanco)
    })

    it('Deve retornar OK quando deletar um integrante', async () => {
        const req = {
            params: {
                idBanda: "64945a44a4b9e8542f31",
                idIntegrante: "64945a44a4b9ejkgj31"
            }
        }
        const retornoBanco = {message: `Integrante de ID 64945a44a4b9ejkgj31 removido com sucesso!`}

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        bandas.findOneAndUpdate = jest.fn(() => retornoBanco)
        const response = await sut.deletarIntegrante(req, res)
        expect(response).toEqual(retornoBanco)
    })
    it('Deve retornar OK quando inserir um integrante', async () => {
        const req = {
            params: {
                idBanda: "64945a44a4b9e8542f31",
                nomeIntegrante: "Geraldo"
            }
        }
        const retornoBanco = {message: `Integrante 64945a44a4b9ejkgj31 foi adicionado na BANDA com sucesso!`}

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        bandas.findOneAndUpdate = jest.fn(() => retornoBanco)
        const response = await sut.inserirIntegrante(req, res)
        expect(response).toEqual(retornoBanco)
    })

});