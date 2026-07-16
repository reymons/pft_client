export type ModelId = number;

export class Model {
    readonly id: ModelId;

    constructor(id: ModelId) {
        this.id = id;
    }
}
