import { InjectService } from "@/app/functions/inject-service.func";
import { _ServerResponseDecryptionService } from "@/app/server/response-decryptor.service";
import { _AppRouteCallService } from "@/app/server/routes/app-route-call/app-route-call.service";
import { _ServerCallService } from "@/app/server/server-call.sevice";
import { firstValueFrom } from "rxjs";

export async function INIT_pingServer() {
    const AppAPiCall = InjectService(_AppRouteCallService)

    const data = await firstValueFrom(AppAPiCall.ping())

    //Continue
}