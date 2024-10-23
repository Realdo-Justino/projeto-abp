export class User {
    private _login: string|undefined;
    private _password: string|undefined;

    constructor(params: {
        login: string|undefined,
        password: string|undefined
    }) {
        const { login, password } = params;

        this._login = login;
        this._password = password;
    }

    get login() : string|undefined {return this._login}
    get password() : string|undefined {return this._password}
}
