export default interface ITokenGenerator {
    generate: (email: string) => string
}