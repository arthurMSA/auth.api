class User {
    private _name: string
    private _email: string
    private _password: string
    private _token: string
    
    construct(name: string, email: string, password: string, token: string) {
        this._name = name
        this._email = email
        this._password = password
        this._token = token
    }
    
    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        this._name = value
    }

    public get email(): string {
        return this._email
    }

    public set email(value: string) {
        this._email = value
    }

    public get password(): string {
        return this._password
    }

    public set password(value: string) {
        this._password = value
    }

    public get token(): string {
        return this._token
    }

    public set token(value: string) {
        this._token = value
    }
}