export type Subscription = {
    unsubscribe(): void
}

export interface SubjectEventInt <Data = unknown> {
    emit(value: Data): void;

    subscribe(cb: (data: Data) => void): Subscription
}