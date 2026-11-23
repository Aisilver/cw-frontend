import { DefineService } from "@/app/functions/define-service.func";
import { RouteHandler } from "../../classes/route-handler.class";
import type { ItExists } from "@shared/common";
import type { SignUpRequestPayload } from "@shared/routes";

class AuthRouteCallService extends RouteHandler {
    verifyUsername = (username: string) => this.httpCall<ItExists>(["verify-username", username], undefined, {doNotIncludeAccessToken: true}).get()

    createAccount = (payload: SignUpRequestPayload) => this.httpCall<void>("create-account", undefined, {doNotIncludeAccessToken: true}).post(payload)
}

export const _AuthRouteCallService = DefineService("auth-route-call-service", new AuthRouteCallService("auth"))