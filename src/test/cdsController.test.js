import { describe, expect, it, jest } from "@jest/globals";
import CdsController from "../controller/cdsController";
import cds from "../models/Cds";

describe("cdsController", () => {
    jest.useFakeTimers();
    let sut = CdsController

    it("Deve retonar a lista de cds", async () => {
        const req = {};
        const retornoBanco = [
            {
                _id: "6494688533375294c235b3fb",
                album: "album 4",
                ano: 1980,
                banda: {
                    _id: "64945707624b423b86654caf",
                    banda: "a banda 4",
                    integrantes: [
                        {
                            nome: "Matt Shadows",
                            _id: "64945cad0f9c2bfd5089bf5f"
                        },
                        {
                            nome: "bebeto",
                            _id: "64945dcfb835008d3a5a1af9"
                        }
                    ]
                }
            }
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
        cds.find = jest.fn(() => retornoBanco);
        const response = await sut.listarCds(req, res);
        expect(response).toHaveLength(1);
    });


    it('Deve retornar a lista de cds filtrados', async () => {
        const req = {
            query: {
                album: "album 4"
            }
        }
        const retornoBanco = [
            {
                _id: "6494688533375294c235b3fb",
                album: "album 4",
                ano: 1980,
                banda: {
                    _id: "64945707624b423b86654caf",
                    banda: "a banda 4",
                    integrantes: [
                        {
                            nome: "Matt Shadows",
                            _id: "64945cad0f9c2bfd5089bf5f"
                        },
                        {
                            nome: "bebeto",
                            _id: "64945dcfb835008d3a5a1af9"
                        }
                    ]
                }
            }
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
        cds.filtroCd = jest.fn(() => retornoBanco)
        const response = await sut.filtroCds(req, res)
        expect(response).toEqual(retornoBanco)
    })

    it('Deve retornar OK quando inserir um cd', async () => {
        const req = {
            body: {

                banda: "649457076243b86654caf",
                album: "bola de ouro",
                ano: 1980

            }
        }
        const retornoBanco = { message: `CD novo salvo! ID: 546545445` }

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        let cdNovo = new cds(req.body)
        cdNovo.save = jest.fn(() => retornoBanco)
        const response = await sut.cadastrarCds(req, res)
        expect(response).toEqual(retornoBanco)
    })

    it('Deve retornar OK quando atualizar uma cd', async () => {
        const req = {
            body: {

                banda: "649457076243b86654caf",
                album: "bola de ouro",
                ano: 1980

            }
        }
        const retornoBanco = {message: `CD de Id: 151616511 atualizado!`}

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        cds.findByIdAndUpdate = jest.fn(() => retornoBanco)
        const response = await sut.atualizarCd(req, res)
        expect(response).toEqual(retornoBanco)
    })

    it('Deve retornar OK quando deletar um cd', async () => {
        const req = {
            params: {
                id: "64945a44a4b9e8542f31"
            }
        }
        const retornoBanco = {message: `CD removido com sucesso!`}

        const res = {
            status: () => {
                return {
                    json: () => {
                        return retornoBanco;
                    }
                };
            }
        };
        cds.findByIdAndDelete = jest.fn(() => retornoBanco)
        const response = await sut.deletarCd(req, res)
        expect(response).toEqual(retornoBanco)
    })
})