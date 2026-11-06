export type Vars = {
    duration?: number
} & Partial<CSSStyleDeclaration>

export class Animator {

    private getTransitionValue = (duration = .5) => `${duration}s`

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
        let targetOrgStyleValues: Partial<CSSStyleDeclaration> = {}

        const { duration , ...fromStyles } = vars

        for (const styles in fromStyles) {
            targetOrgStyleValues[styles] = target.style[styles]
        }

        target.style.transition = 'none'
        Object.assign(target.style, fromStyles)

        // Force the browser to register the starting styles.
        target.getBoundingClientRect()

        target.style.transition = this.getTransitionValue(duration)
        
        Object.assign(target.style, targetOrgStyleValues)

        await this.delay(duration)
    }
}