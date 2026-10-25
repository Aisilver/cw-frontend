import { DefineService } from "@/app/functions/define-service.func";

class UserService {
    private declare _AccessToken: string;

    readonly CLIENT_PUBLIC_KEY = crypto.randomUUID()

    get AccessToken () {
        if(!this._AccessToken) throw Error("Access token not yet set")

            return this._AccessToken
    }

    setAccessToken (token: string) {
        this._AccessToken = token
    }
}

export const _UserService = DefineService("user-service", new UserService())