import { defineComponent, ref } from "vue";
import { _GCModalService } from "../shared/modals/g-centered-modal.service";
import { InjectService } from "@/app/functions/inject-service.func";

export default defineComponent({
    setup() {
        const Message = ref("Welcome To Auth")

        return {
            Message
        }
    },

    methods: {
        openDialogue() {
            const GCModal = InjectService(_GCModalService)

            GCModal.openDialogue()
        }
    }
})