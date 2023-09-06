
const errorHandler = (error: { error: string[] | string }) => {
    if (Array.isArray(error))
        return error[0]

    if (typeof error === 'string')
        return error

    return "Ocorreu algum erro!"
}

export { errorHandler }