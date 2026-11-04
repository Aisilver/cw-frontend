import { InjectService } from '@/app/functions/inject-service.func'
import { _ServerResponseDecryptionService } from '@/app/server/response-decryptor.service'
import { _AppRouteCallService } from '@/app/server/routes/app-route-call/app-route-call.service'
import { _ServerCallService } from '@/app/server/services/server-call.sevice'
import { PingComponent } from './ping-component'
import { fetchRetry } from '@/app/functions/fetch-retry.func'

const pingComponent = new PingComponent()

export async function INIT_pingServer() {
  const AppAPiCall = InjectService(_AppRouteCallService)

  try {
    await fetchRetry(AppAPiCall.ping(), {
      count: pingComponent.TotalRetries,

      timeout: pingComponent.TryDurationinMS,

      delay() {
        pingComponent.Retrying()

        return { continueRetry: true }
      },
    })

    pingComponent.PingSuccessfull()
  } catch (error: any) {
    pingComponent.Failed()

    throw error
  }
}
