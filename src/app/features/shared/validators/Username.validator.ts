import { Validator } from "@/app/abs-classes/validator.abs.class";

export class Usernamevalidator extends Validator {
    isAsync: boolean = true;

    validate(target: HTMLInputElement): {} | null {
        
        return null
    }
}