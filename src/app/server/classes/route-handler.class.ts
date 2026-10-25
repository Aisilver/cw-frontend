import { InjectService } from "@/app/functions/inject-service.func";
import { _ServerCallService } from "../server-call.sevice";
import type { ServerCallBehavior } from "../types";

export abstract class RouteHandler {
    private declare routePrefix: string

    constructor (routePrefix?: string) {
        if(routePrefix) this.routePrefix = routePrefix
    }

    protected httpCall<Data = unknown>(params: (string | number)[] | string = "", queries = {}, opt: ServerCallBehavior = {}) {
        const serverCallService = InjectService(_ServerCallService)

        if(this.routePrefix){
            if(typeof params == "string")
                params = [this.routePrefix, params]
            else
                params = [this.routePrefix, ...params]
        }

        return serverCallService.call<Data>(params, queries, opt)
    }
}