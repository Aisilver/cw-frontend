import { defineComponent, ref } from "vue";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import formComponent from "@/app/features/shared/components/form-component/form.component.vue";
import inputComponent from "@/app/features/shared/components/input-component/input.component.vue";
import formErrMessageComponent from "@/app/features/shared/components/form-err-message/form-err-message.component.vue";
import signUpAccountProfilePicComponent from "./sign-up-account-profile-pic/sign-up-account-profile-pic.component.vue";

export default defineComponent({
    components: {
        imageComponent,
        formComponent,
        inputComponent,
        formErrMessageComponent,
        signUpAccountProfilePicComponent
    },

    setup() {
        const UsernameModel = ref< InstanceType<typeof inputComponent> | null>(null)

        return { UsernameModel }
    },

    methods: {
        Submit(data: any) {

        }
    }
})