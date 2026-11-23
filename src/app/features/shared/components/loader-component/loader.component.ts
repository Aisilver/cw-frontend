import { Animator } from "@/app/classes/animator/animator.class";
import { createVNode, defineComponent, ref, render } from "vue";
import type { LoaderTypeOptions } from "./types.ts";
import FadeLoaderComponent from "./loaders/fade-loader/fade-loader.component.vue";
import SpinnerLoaderComponent from "./loaders/spinner-loader/spinner-loader.component.vue";
import { Delay } from "@/app/functions/delay.func.ts";


// From ChatGPT

type LoaderParameter = {
    [K in keyof LoaderTypeOptions]: LoaderTypeOptions[K] extends void ? K : K | { [P in K]: LoaderTypeOptions[K] }
}[keyof LoaderTypeOptions];

// END of ChatGPT input

export default defineComponent({
    components: {
        FadeLoaderComponent,
        SpinnerLoaderComponent
    },

    props: {
        hideContent: {
            type: Boolean
        }
    },

    setup() {
        const FloatDOMElement = ref<HTMLElement | null>(null),

        LoaderContainer = ref<HTMLElement | null>(null),

        animator = new Animator()

        return { FloatDOMElement, LoaderContainer, animator }
    },

    mounted() {
        if(!this.LoaderContainer) return

        const [ui_float, content] = this.LoaderContainer.children

        if(!content) return

        this.animator.set(ui_float as HTMLElement, {pointerEvents: "none"})

        this.animator.set(content as HTMLElement, {flex: "1"})

        if(this.hideContent) this.animator.set(content as HTMLElement, {opacity: "0"})
    },

    methods: {

        getloader (type: keyof LoaderTypeOptions) {
            switch(type) {
                case "fade-loader": return FadeLoaderComponent

                case "spinner-loader": return  SpinnerLoaderComponent

                default: throw Error(`unknown loader type: "${type}"`)
            }
        },

        showLoader (loaderType: keyof LoaderTypeOptions, opts?: any) {
            if(!this.FloatDOMElement) throw Error("failed to open: loader container cannot be found")

            const vnode = createVNode(this.getloader(loaderType), {opts})

            render(vnode, this.FloatDOMElement)

            this.animator.set(this.FloatDOMElement, {pointerEvents: "all"})

            this.animator.set(vnode.el as HTMLElement, {flex: "1"})
        },

        closeLoader () { 
            if(!this.FloatDOMElement) throw Error("failed to close: loader container cannot be found")

            render(null, this.FloatDOMElement)

            if(this.hideContent) {
                if(!this.LoaderContainer) return

                const [ui_float, content] = this.LoaderContainer.children
                
                this.animator.set(content as HTMLElement, {opacity: "1"})
            }

            this.animator.set(this.FloatDOMElement, {pointerEvents: "none"})
        },

        async load<Data = unknown>(target: () => Promise<Data>, opts: LoaderParameter = "fade-loader") {
            let targetValue: Data

            if(typeof opts == "string")
                this.showLoader(opts)
            else {
                const loaderOption = Object.entries(opts)[0]

                if(!loaderOption) throw Error("cannot pass an empty loader options object")

                const [loaderType, loaderTypeArg] = loaderOption

                this.showLoader(loaderType as any, loaderTypeArg)
            }

            targetValue = await target()

            Delay(1000).then(() => this.closeLoader())

            return targetValue
        }
    }
})