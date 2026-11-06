import { APP_IMAGE_PATHs_CONFIGURATIONS } from "@/app/configurations/image-paths.config";
import { defineComponent, ref } from "vue";
import imageComponent from "../image-component/image.component.vue";

export default defineComponent({
    components: {
        imageComponent
    },
    setup() {
        const {LOGO} = APP_IMAGE_PATHs_CONFIGURATIONS,

        logoUrl = ref(LOGO),

        title = ref("afterclass")

        return { logoUrl, title }
    }
})