import { DefineService } from "@/app/functions/define-service.func";
import { RouteHandler } from "../../classes/route-handler.class";
import type { ItExists } from "@shared/common";

class AuthRouteCallService extends RouteHandler {
    verifyUsername = (username: string) => this.httpCall<ItExists>(["verify-username", username], undefined, {doNotIncludeAccessToken: true}).get()
}

export const _AuthRouteCallService = DefineService("auth-route-call-service", new AuthRouteCallService("auth"))