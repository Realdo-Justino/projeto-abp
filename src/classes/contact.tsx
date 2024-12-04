export class Contact {
    private _id: number;
    private _name: string;
    private _avatar: string;

    constructor(params: {
        id: number,
        name: string,
        avatar: string
    }) {
        const { id, name, avatar } = params;

        this._id = id;
        this._name = name;
        this._avatar = avatar;
    }

    get id() : number {return this._id}
    get name() : string {return this._name}
    get avatar() : string {return this._avatar}
}
