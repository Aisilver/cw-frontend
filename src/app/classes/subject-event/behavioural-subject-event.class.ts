import { SubjectEvent } from "./subject-abs.class";
import type { Subscription } from "./types";

export class BehaviouralSubject<Data = unknown> extends SubjectEvent<Data> {
    private declare Value: Data
    
    constructor (value: Data) {
        super()
         
        this.Value = value
    }

    getValue = () => this.Value

    emit(data: Data): void {
        this.Value = data

        this.event.dispatchEvent(new CustomEvent<Data>(this.eventKey, {detail: data}))
    }

    subscribe (cb: (data: Data) => void): Subscription {
        const self = this, 
        
        subscriberKey = crypto.randomUUID()

        if(this.subscribers.size == 0) this.addListener()

        this.subscribers.set(subscriberKey, cb)

        this.emit(this.Value)

        return {
            unsubscribe() {
                self.subscribers.delete(subscriberKey)

                self.cleanupEvent()
            }
        }
    }
}