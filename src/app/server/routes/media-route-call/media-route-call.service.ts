import { DefineService } from "@/app/functions/define-service.func";
import { RouteHandler } from "../../classes/route-handler.class";
import type { TempFileUploadResponseData } from "@shared/routes";

class MediaRouteCallService extends RouteHandler {
    ulploadTempFile (file: File) {
        const formData = new FormData()

        formData.append("file", file)

        return this.httpCall<TempFileUploadResponseData>("temp-file-upload", undefined, {doNotIncludeAccessToken: true, bodyIsNotJSON: true}).post(formData)
    }
}

export const _MediaRouteCallService = DefineService("media-route-call-service", new MediaRouteCallService("media"))