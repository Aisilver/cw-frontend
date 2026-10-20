import { defineComponent, ref } from "vue";

export default defineComponent ({
    setup() {
        const Message = ref("Welcome Home")

        return { Message }
    }
})