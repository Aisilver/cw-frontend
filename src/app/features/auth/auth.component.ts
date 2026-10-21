import { defineComponent, ref } from "vue";
import { _GCModalService } from "../shared/modals/g-centered-modal.service";

export default defineComponent({
    setup() {
        const Message = ref("Welcome To Auth")

        return {
            Message
        }
    },

    methods: {
        openDialogue() {
            const GCModal = _GCModalService().state

            GCModal.openDialogue()
        }
    }
})