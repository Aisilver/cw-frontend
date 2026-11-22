import { Validator } from "@/app/abs-classes/validator.abs.class";
import { Debouncer } from "@/app/classes/debouncer/debouncer.class";
import { APP_REGEXES_CONFIGURATIONS } from "@/app/configurations/regexs.config";
import { InjectService } from "@/app/functions/inject-service.func";
import { _AuthRouteCallService } from "@/app/server/routes/auth-route-call/auth-route-call.service";

export class Usernamevalidator extends Validator {
    isAsync?: boolean | undefined = true;

    private AuthApiCall = InjectService(_AuthRouteCallService)

    private debouncer = new Debouncer(1000)

    private preValidations (value: string): {} | null{
        const {MUST_START_WITH_A_LETTER} = APP_REGEXES_CONFIGURATIONS

        if(value.length < 6) return {TOO_SHORT: true}

        if(!MUST_START_WITH_A_LETTER.test(value)) return {STARTS_WITH_A_SYMBOL_OR_NUMBER: true}
        
        return null
    }

    validate(target: HTMLInputElement) {
        return new Promise<{} | null>((res) => {
            const { value } = target,

            error = this.preValidations(value)

            if(!value) return res(null)

            if(error) return res(error)

            this.debouncer.debounce(async () => {
                if(!value) return res(null)

                if(error) return res(error)

                try {
                    this.inputComponentInst.startAsyncValidationProcess()

                    const {state, data} = await this.AuthApiCall.verifyUsername(value)

                    if(state !== "succeeded") throw Error()

                    res(data.exists ? {USERNAME_EXISTS: true} : null)

                } catch (error) {
                    res({VERIFICATION_FAILED: true})
                } finally {
                    this.inputComponentInst.endAsyncValidationProcess()
                }
            })
        })
    }
}