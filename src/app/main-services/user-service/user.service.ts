import { DefineService } from "@/app/functions/define-service.func";
import type { Account } from "@shared/entities";

class UserService {
    private declare _AccessToken: string;

    private declare _MyAccount: Account

    readonly CLIENT_PUBLIC_KEY = crypto.randomUUID()

    get AccessToken () {
        if(!this._AccessToken) throw Error("Access token not yet set")

        return this._AccessToken
    }

    get MyAccount () {
        if(!this._MyAccount) throw Error("User has not logged in yet")
        return this._MyAccount
    }

    get isLoggedIn () {
        return !this.MyAccount == false 
    } 

    setAccessToken (token: string) {
        this._AccessToken = token
    }

    setAccount (acct: Account) {
        this._MyAccount = acct
    }
}

export const _UserService = DefineService("user-service", new UserService())