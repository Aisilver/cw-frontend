export abstract class Validator {
    id: string;

    abstract validate(target: HTMLInputElement): Promise<Record<string, boolean> | null> | (Record<string, boolean> | null)

    constructor () {
        this.id = crypto.randomUUID()
    }
}