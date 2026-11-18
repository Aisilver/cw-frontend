import { DefineService } from "@/app/functions/define-service.func";
import { RouteHandler } from "../../classes/route-handler.class";

class AuthRouteCallService extends RouteHandler {
    verifyUsername = (username: string) => this.httpCall(["verify-username", username])
}

export const _AuthRouteCallService = DefineService("auth-route-call-service", new AuthRouteCallService("auth"))