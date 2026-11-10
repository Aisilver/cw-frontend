import { Animator } from "@/app/classes/animator/animator.class";
import { createVNode, defineComponent, ref, render } from "vue";
import FadeLoaderComponent from "./loaders/fade-loader/fade-loader.component.vue";

type LoaderTypes = "fade-loader"

export default defineComponent({
    components: {
        FadeLoaderComponent
    },

    props: {
        type: {
            type: String
        }
    },

    setup(props) {
        const FloatDOMElement = ref<HTMLElement | null>(null),

        LoaderContainer = ref<HTMLElement | null>(null),

        animator = new Animator()

        return { FloatDOMElement, LoaderContainer, animator }
    },

    mounted() {
        if(!this.LoaderContainer) return

        const [ui_float, content] = this.LoaderContainer.children

        if(!content) return

        this.animator.set(content as HTMLElement, {flex: "1"})
    },

    methods: {
        getloader () {
            switch(this.type as LoaderTypes) {
                case "fade-loader": return FadeLoaderComponent
            }
        },

        showLoader () {
            if(!this.FloatDOMElement) throw Error("failed to open: loader container cannot be found")

            const vnode = createVNode(this.getloader())

            render(vnode, this.FloatDOMElement)

            this.animator.set(this.FloatDOMElement, {pointerEvents: "all"})

            this.animator.set(vnode.el as HTMLElement, {flex: "1"})
        },

        closeLoader () { 
            if(!this.FloatDOMElement) throw Error("failed to close: loader container cannot be found")

            render(null, this.FloatDOMElement)

            this.animator.set(this.FloatDOMElement, {pointerEvents: "none"})
        },

        delay (timeDelay = 0) {
            return new Promise<void>((res) => setTimeout(() => res(), timeDelay))
        },

        async load<Data = unknown>(target: () => Promise<Data>) {
            let targetValue: Data

            this.showLoader()

            targetValue = await target()

            this.delay(1000).then(() => this.closeLoader())

            return targetValue
        }
    }
})