import { defineComponent, ref } from "vue";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import formComponent from "@/app/features/shared/components/form-component/form.component.vue";
import inputComponent from "@/app/features/shared/components/input-component/input.component.vue";
import formErrMessageComponent from "@/app/features/shared/components/form-err-message/form-err-message.component.vue";
import signUpAccountProfilePicComponent from "../sign-up-account-profile-pic/sign-up-account-profile-pic.component.vue";
import { InjectService } from "@/app/functions/inject-service.func.ts";
import { _SignupService } from "../../services/sign-up.service.ts";
import type { Account } from "@shared/entities/account.entity.js";
import { APP_ENTITY_DUMMY_DATA } from "@/app/configurations/dummy-entity-data.config.ts";
import { Usernamevalidator } from "@/app/features/shared/validators/Username.validator.ts";

export default defineComponent({
    components: {
        imageComponent,
        formComponent,
        inputComponent,
        formErrMessageComponent,
        signUpAccountProfilePicComponent
    },

    setup() {
        const service = InjectService(_SignupService),
        
        UsernameModel = ref< InstanceType<typeof inputComponent> | null>(null),

        PasswordWodel = ref< InstanceType<typeof inputComponent> | null>(null),

        ProfileImageRef = ref<string | null>(null),

        NewAccount = ref<Account>(service.NewAccount ?? APP_ENTITY_DUMMY_DATA.ACCOUNT)

        return { UsernameModel, PasswordWodel, ProfileImageRef, service, NewAccount }
    },

    mounted() {
        this.UsernameModel?.addValidator(Usernamevalidator)
    },

    methods: {
        OnProfileImageSet (fileRef: string) {
            this.ProfileImageRef = fileRef
        },

        Submit(data: any) {

        }
    }
})