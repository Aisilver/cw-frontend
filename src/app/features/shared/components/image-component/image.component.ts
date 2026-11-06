import { Animator } from "@/app/classes/animator/animator.class";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const ImgElement = ref<HTMLImageElement | null>(null),

        animator = new Animator()

        return { ImgElement, animator }
    },

    mounted() {
        if(!this.ImgElement) return

        this.animator.set(this.ImgElement, {objectFit: this.objectFit ?? 'cover'})

        this.ImgElement.src = this.src ?? ""
    },

    props: {
        src: {
            type: String
        },

        objectFit: {
            type: String
        }
    }
})