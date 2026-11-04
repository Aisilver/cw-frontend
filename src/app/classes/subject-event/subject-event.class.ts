import { SubjectEvent } from "./subject-abs.class";
import type { Subscription } from "./types";


export class Subject<Data = unknown> extends SubjectEvent<Data> {
    emit(data: Data) {
        this.event.dispatchEvent(new CustomEvent<Data>(this.eventKey, {detail: data}))
    }

    subscribe (cb: (data: Data) => void): Subscription {
        const self = this, 
        
        subscriberKey = crypto.randomUUID()

        if(this.subscribers.size == 0) this.addListener()

        this.subscribers.set(subscriberKey, cb)

        return {
            unsubscribe() {
                self.subscribers.delete(subscriberKey)

                self.cleanupEvent()
            }
        }
    }
}