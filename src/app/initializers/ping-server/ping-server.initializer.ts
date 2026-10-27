import { InjectService } from "@/app/functions/inject-service.func";
import { _ServerResponseDecryptionService } from "@/app/server/response-decryptor.service";
import { _AppRouteCallService } from "@/app/server/routes/app-route-call/app-route-call.service";
import { _ServerCallService } from "@/app/server/server-call.sevice";
import { firstValueFrom, of, retry, timeout } from "rxjs";
import { PingComponent } from "./ping-component";

const pingComponent = new PingComponent()

export async function INIT_pingServer() {
    const AppAPiCall = InjectService(_AppRouteCallService)

    try {
        await firstValueFrom(AppAPiCall.ping().pipe(

            timeout(pingComponent.TryDuration * 1000),

            retry ({
                count: pingComponent.TotalRetries - 1,

                delay() {
                    pingComponent.Retrying()

                    return of(null)
                }
            })
        ))

        pingComponent.PingSuccessfull()
        
    } catch (error: any){
        pingComponent.Failed()

        throw error
    }
}