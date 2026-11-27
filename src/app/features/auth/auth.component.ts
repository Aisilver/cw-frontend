import { defineComponent } from "vue";
import NavComponent from "@/app/features/shared/components/nav-component/nav.component.vue"
import imageComponent from "../shared/components/image-component/image.component.vue";
import logoComponent from "../shared/components/logo-component/logo.component.vue";
import { APP_IMAGE_PATHs_CONFIGURATIONS } from "@/app/configurations/image-paths.config.ts";

export default defineComponent({
    components: {
        NavComponent,
        logoComponent,
        imageComponent
    },

    setup() {
        const BannerImgUrl = APP_IMAGE_PATHs_CONFIGURATIONS.SCHOOL_IMAGE

        return { BannerImgUrl }
    }
})