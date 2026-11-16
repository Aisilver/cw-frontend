import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },

    setup() {
        const LabelDOMElement = ref<HTMLLabelElement | null>(null),

        RadioElement = ref<HTMLInputElement | null>(null),

        UniqueKey = window.crypto.randomUUID()

        return { LabelDOMElement, UniqueKey, RadioElement }
    },

    computed: {
        Selected() {
            if(!this.RadioElement) return

            const {value: inputValue} = this.RadioElement

            return inputValue === this.modelValue
        }
    },

    mounted() {
        if(!this.LabelDOMElement) return

        this.RadioElement = this.LabelDOMElement.querySelector<HTMLInputElement>("input[type='radio']")

        if(!this.RadioElement) return

        this.RadioElement.hidden = true

        this.RadioElement.id = this.UniqueKey
    }
})