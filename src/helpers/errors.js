export const notFound = (error) => ({
    statusCode: error.status,
    body: error.message,
    detail: error.detail
})

export const notFoundFilter = () => ({
    statusCode: 404,
    body: `Seu filtro falhou`,
    detail: `Não encontramos nenhum registro com esse valor `
})
