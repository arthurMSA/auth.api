export default class EmailAlreadyExistError extends Error {
    constructor() {
        super('O email já esta em uso.')
        this.name = 'EmailAlreadyExistError'
    }
}