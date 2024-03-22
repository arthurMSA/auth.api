export default interface IDBConnection {
    connect(userName: string, password: string, host: string): void
}