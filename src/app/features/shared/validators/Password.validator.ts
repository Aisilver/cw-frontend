import { Validator } from "@/app/abs-classes/validator.abs.class";
import { APP_REGEXES_CONFIGURATIONS } from "@/app/configurations/regexs.config";

export class PasswordValidator extends Validator {
    
    validate(target: HTMLInputElement): Promise<Record<string, boolean> | null> | (Record<string, boolean> | null) {
        const { value } = target,

        {MUST_HAVE_A_NUMBER, MUST_HAVE_A_CAPITAL_LETTER, MUST_HAVE_A_SYMBOL} = APP_REGEXES_CONFIGURATIONS

        if(!value) return null

        if(!MUST_HAVE_A_CAPITAL_LETTER.test(value)) return {MUST_HAVE_CAPITAL_LETTER: true}

        if(!MUST_HAVE_A_NUMBER.test(value)) return {MUST_HAVE_A_NUMBER: true}

        if(!MUST_HAVE_A_SYMBOL.test(value)) return {MUST_HAVE_A_SYMBOL: true}

        if(value.length < 6) return {TOO_SHORT: true}

        return null
    }

}