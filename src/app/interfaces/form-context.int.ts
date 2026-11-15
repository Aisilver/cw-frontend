import type { InputModel } from "./input-model-element.int";

export interface FormContext {
    registerField: (name: string, field: InputModel) => void;

    unregisterField: (name: string) => void;
}