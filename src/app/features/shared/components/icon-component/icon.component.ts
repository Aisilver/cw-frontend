import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true
        },

        type: {
            type: String
        }
    },

    setup() {
        const IconClassname = ref<string | null>(null)

        return { IconClassname }
    },

    watch: {
        name() {this.IconClassname = this.generateIconClassname(this.name, this.type)},

        type() {this.IconClassname = this.generateIconClassname(this.name, this.type)}
    },

    methods: {
        generateIconClassname (name: string, type?: string) {
            return `fa-${type ?? 'solid'} fa-${name}`
        }
    },

    mounted() {
        this.IconClassname = this.generateIconClassname(this.name, this.type)
    }
})