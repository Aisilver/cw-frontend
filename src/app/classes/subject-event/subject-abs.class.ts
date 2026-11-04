import type { SubjectEventInt, Subscription } from "./types"

export abstract class SubjectEvent <Data = unknown> implements SubjectEventInt {
    protected event = new EventTarget()

    protected eventKey: string = crypto.randomUUID();

    protected subscribers = new Map<string, ((data: Data) => Promise<void> | void)>()

    abstract emit(data: Data): void

    abstract subscribe(cb: (data: unknown) => void): Subscription;

    private readonly listener = (event: Event) => {
        this.eventHandler(event)
    }
    
    protected addListener () {
        this.event.addEventListener(this.eventKey, this.listener)
    }

    private eventHandler (e: Event) {
        this.subscribers.forEach(sub => sub((e as CustomEvent).detail))
    }

    protected cleanupEvent(){
        if(this.subscribers.size > 0) return

        this.event.removeEventListener(this.eventKey, this.listener)
    }
}