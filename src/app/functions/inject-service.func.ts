import type { SetupStoreDefinition } from "pinia";

export function InjectService<Service>(serviceSetup: SetupStoreDefinition<string, {state: Service}>): Service {
    const store = serviceSetup()

    //@ts-ignore
    return store.state
}