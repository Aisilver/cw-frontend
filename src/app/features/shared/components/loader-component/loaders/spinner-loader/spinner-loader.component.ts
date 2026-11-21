import { defineComponent } from "vue";

export type SpinnerLoaderOptions = {
    colorStyle?: "primary",
    spinnerSize?: number
}

export default defineComponent ({
    props: {
        opts: {
            type: Object
        }
    },

    computed: {
        Style () {
            return (this.opts as SpinnerLoaderOptions)?.colorStyle ?? "primary"
        },

        Size () {
            return `${(this.opts as SpinnerLoaderOptions)?.spinnerSize ?? 40}px`
        }
    }
})