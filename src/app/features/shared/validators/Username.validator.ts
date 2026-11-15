import type { Validator } from "@/app/interfaces/validator.int";

export class Usernamevalidator implements Validator {
    isAsync: boolean = true;

    validate(target: HTMLInputElement): {} | null {
        
        return null
    }
}