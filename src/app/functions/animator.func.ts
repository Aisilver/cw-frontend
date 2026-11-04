export type Vars = {
    duration?: number
} & Partial<CSSStyleDeclaration>

export class Animator {

    private getTransitionValue = (duration = .5) => `${duration ?? .5}s`

    private delay = (duration: number = .5) => new Promise<void>((res) =>  setTimeout(() => res(), duration * 1000))


    set(target: HTMLElement, vars: Partial<CSSStyleDeclaration>) {
        Object.assign(target.style, vars)
    }

    async to (target: HTMLElement, vars: Vars) {
        const {duration, ...rest} = vars

        target.style.transition = this.getTransitionValue(duration)

        Object.assign(target.style, rest)

        await this.delay(duration)
    }

    async from(target: HTMLElement, vars: Vars) {
        const { duration = 0.5, ...fromStyles } = vars

        const original = {
            opacity: target.style.opacity,
            transform: target.style.transform
        }

        target.style.transition = 'none'
        Object.assign(target.style, fromStyles)

        // Force the browser to register the starting styles.
        target.getBoundingClientRect()

        target.style.transition = this.getTransitionValue(duration)
        Object.assign(target.style, original)

        await this.delay(duration)
    }
}