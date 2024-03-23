export default class InvalidEmailError extends Error {
    constructor() {
        super('Email inválido')
        this.name = 'InvalidEmailError'
    }
}