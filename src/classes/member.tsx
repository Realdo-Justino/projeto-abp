export class Member {
    private _id: number;
    private _name: string;

    constructor(params: {
        id: number,
        name: string
    }) {
        const { id, name } = params;

        this._id = id;
        this._name = name;
    }

    get id() : number {return this._id}
    get name() : string {return this._name}
}
