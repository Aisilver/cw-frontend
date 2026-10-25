import { defineStore, type SetupStoreDefinition } from "pinia"
import { reactive } from "vue"

export function DefineService<Service>(key: string, service: Service): SetupStoreDefinition<string, {state: Service}> {
    return defineStore(key, () => {
        const state = reactive(service as any)

        return { state }

    })
}