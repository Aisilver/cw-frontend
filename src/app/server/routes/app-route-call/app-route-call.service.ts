import { DefineService } from "@/app/functions/define-service.func"
import { RouteHandler } from "../../classes/route-handler.class"
import type { ClientPublicKeyRegistrationRequest } from '@shared/routes'

class AppRouteCallService extends RouteHandler {
    ping = () => this.httpCall("ping", undefined, {doNotIncludeAccessToken: true}).get()

    registerClientPublicKey = (data: ClientPublicKeyRegistrationRequest) => this.httpCall("reg-pub-key", undefined, {doNotIncludeAccessToken: true}).post(data)
}

export const _AppRouteCallService = DefineService("app-route-call-service", new AppRouteCallService("app"))