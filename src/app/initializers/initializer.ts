import { INIT_pingServer } from "./ping-server/ping-server.initializer";
import { INIT_registerClientPublicKey } from "./register-client-pub-key/reg-client-pub-key.initializer";

export const Initializers: (() => void | Promise<void>)[] = [
    INIT_pingServer,
    INIT_registerClientPublicKey
]