import { defineComponent, ref } from "vue";
import { _GCModalService } from "../shared/modals/g-centered-modal.service";
import NavComponent from "@/app/features/shared/components/nav-component/nav.component.vue"
import { InjectService } from "@/app/functions/inject-service.func";

export default defineComponent({
    components: {
        NavComponent
    },

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