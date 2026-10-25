import { DefineService } from "@/app/functions/define-service.func"
import { RouteHandler } from "../../classes/route-handler.class"

class AppRouteCallService extends RouteHandler {
    ping = () => this.httpCall("ping", undefined, {doNotIncludeAccessToken: true}).get()
}

export const _AppRouteCallService = DefineService("app-route-call-service", new AppRouteCallService("app"))