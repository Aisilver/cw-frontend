import iconComponent from "@/app/features/shared/components/icon-component/icon-component.vue";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import loaderComponent from "@/app/features/shared/components/loader-component/loader.component.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {
        imageComponent,
        loaderComponent,
        iconComponent
    },

    setup () {
        const ProfileImgUrl = ref<string | null>()

        return { ProfileImgUrl }
    }
})