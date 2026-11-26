import { defineComponent, ref } from "vue";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import formComponent from "@/app/features/shared/components/form-component/form.component.vue";
import inputComponent from "@/app/features/shared/components/input-component/input.component.vue";
import formErrMessageComponent from "@/app/features/shared/components/form-err-message/form-err-message.component.vue";
import { InjectService } from "@/app/functions/inject-service.func.ts";
import { _SignupService } from "../../services/sign-up.service.ts";
import type { Account } from "@shared/entities/account.entity.js";
import { APP_ENTITY_DUMMY_DATA } from "@/app/configurations/dummy-entity-data.config.ts";
import { Usernamevalidator } from "@/app/features/shared/validators/Username.validator.ts";
import { PasswordValidator } from "@/app/features/shared/validators/Password.validator.ts";
import imageUploaderComponent from "@/app/features/shared/components/image-uploader-component/image-uploader.component.vue";
import type { ImageUploaderData } from "@/app/interfaces/image-uploader-data.int.ts";
import loaderComponent from "@/app/features/shared/components/loader-component/loader.component.vue";
import iconComponent from "@/app/features/shared/components/icon-component/icon.component.vue";
import type { Subscription } from "@/app/classes/subject-event/types.ts";

export default defineComponent({
    components: {
        imageComponent,
        iconComponent,
        formComponent,
        inputComponent,
        loaderComponent,
        formErrMessageComponent,
        imageUploaderComponent
    },

    setup() {
        const SavedProfileImageUrlStorageKey = "sign-up-profile-img-key",

        ProfileImageUrl = ref<string | null>(null),

        ProfileImageRef = ref<string>(),

        ImageUploaderComp = ref<InstanceType<typeof imageUploaderComponent> | null>(null),

        subscription = ref<Subscription>(),
        
        service = InjectService(_SignupService),
        
        UsernameModel = ref< InstanceType<typeof inputComponent> | null>(null),

        PasswordWodel = ref< InstanceType<typeof inputComponent> | null>(null),

        ComfirmPasswordModel =  ref< InstanceType<typeof inputComponent> | null>(null),

        Loader = ref<InstanceType<typeof loaderComponent> | null>(null),

        NewAccount = ref<Account>(APP_ENTITY_DUMMY_DATA.ACCOUNT),

        ConfirmPasswordValue = ref<string>("")

        return { 
            SavedProfileImageUrlStorageKey,
            UsernameModel, 
            PasswordWodel, 
            Loader,
            ImageUploaderComp,
            ProfileImageUrl,
            ProfileImageRef, 
            service, 
            NewAccount, 
            ComfirmPasswordModel, 
            ConfirmPasswordValue,
            subscription
        }
    },

    mounted() {
        this.UsernameModel?.addValidator(Usernamevalidator)

        this.PasswordWodel?.addValidator(PasswordValidator)

        this.ProfileImageUrl = sessionStorage.getItem(this.SavedProfileImageUrlStorageKey)

        this.subscription = this.ImageUploaderComp?.events.subscribe(data => {
            const {stage, payload} = data

            if(stage == "started") this.Loader?.openLoader({"spinner-loader": {spinnerSize: 20}})
            
            else if(stage == "completed") {
                if(payload) this.OnProfileImageUploaded(payload)

                this.Loader?.closeLoader()
            }
        })
    },

    computed: {
        PasswordIsConfirmed () {
            return this.NewAccount.password == this.ConfirmPasswordValue
        }
    },

    methods: {
        OnProfileImageUploaded (data: ImageUploaderData) {
            const {imgRef, clientUrl} = data

            sessionStorage.setItem(this.SavedProfileImageUrlStorageKey, clientUrl)

            this.ProfileImageUrl = clientUrl

            this.ProfileImageRef = imgRef
        },

        Back () {
            this.service.toBio()
        },

        Submit() {
            this.service.setAccount(this.NewAccount, this.ProfileImageRef)

            this.service.toCreateAccount()
        }
    },

    beforeUnmount() {
        this.subscription?.unsubscribe()
    }
})