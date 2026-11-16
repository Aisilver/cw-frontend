import { defineComponent } from "vue";
import { APP_IMAGE_PATHs_CONFIGURATIONS } from "@/app/configurations/image-paths.config";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import formComponent from "@/app/features/shared/components/form-component/form.component.vue";
import inputComponent from "@/app/features/shared/components/input-component/input.component.vue";

export default defineComponent({
    components: {
        imageComponent,
        formComponent,
        inputComponent
    },

    setup() {
        const {SIGN_UP_ACCOUNT_SETUP_IMAGE} = APP_IMAGE_PATHs_CONFIGURATIONS,

        ImageSrc = SIGN_UP_ACCOUNT_SETUP_IMAGE


        return { ImageSrc }
    }
})