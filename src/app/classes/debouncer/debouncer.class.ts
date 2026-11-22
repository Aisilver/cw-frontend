export class Debouncer {
    private declare time: number

    private declare timeout: number
    
    constructor (debounceTime: number) {
        this.time = debounceTime
    }

    debounce(cb: () => void) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => cb(), this.time);
    }
}