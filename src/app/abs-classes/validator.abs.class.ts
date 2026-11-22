import { Animator } from "../classes/animator/animator.class";
import type inputComponent from "../features/shared/components/input-component/input.component";

export abstract class Validator {
    private animator = new Animator()

    id: string;

    protected declare inputComponentInst: InstanceType<typeof inputComponent>

    abstract isAsync?: boolean

    abstract validate(target: HTMLInputElement): Promise<Record<string, boolean> | null> | (Record<string, boolean> | null)

    constructor () {
        this.id = crypto.randomUUID()
    }

    setComponentInstance (inputComp: InstanceType<typeof inputComponent>) {
        this.inputComponentInst = inputComp
    }
}