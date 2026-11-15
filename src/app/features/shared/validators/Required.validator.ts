import { Validator } from "@/app/abs-classes/validator.abs.class"

export class RequiredValidator extends Validator {
  validate(target: HTMLInputElement): Promise<Record<string, boolean> | null> | (Record<string, boolean> | null) {
    if(target.required && String(target.value.trim()) == "") return {required: true}

    return null
  }
}