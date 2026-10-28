import { InjectService } from "@/app/functions/inject-service.func";
import { _UserService } from "@/app/main-services/user-service/user.service";
import { _ServerResponseDecryptionService } from "@/app/server/response-decryptor.service";
import { _AppRouteCallService } from "@/app/server/routes/app-route-call/app-route-call.service";
import { _ServerCallService } from "@/app/server/server-call.sevice";
import { firstValueFrom } from "rxjs";

export async function INIT_registerClientPublicKey () {
    const AppApiRouteCall = InjectService(_AppRouteCallService),

    Server_Response_Decryptor = InjectService(_ServerResponseDecryptionService),

    userService = InjectService(_UserService)

    await Server_Response_Decryptor.generateAndSetEncryptionKeys()

    const response = await firstValueFrom(AppApiRouteCall.registerClientPublicKey({
            clientId: userService.CLIENT_PUBLIC_KEY,

            publicKey: Server_Response_Decryptor.ClientPublicEncryptionKey,
        }
    ))

    if(!AppApiRouteCall.responseChecker(response)) throw Error(`Server Error: ${response.message}`)
}