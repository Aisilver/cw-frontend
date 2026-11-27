import { APP_IMAGE_PATHs_CONFIGURATIONS } from "@/app/configurations/image-paths.config";
import formComponent from "@/app/features/shared/components/form-component/form.component.vue";
import FormErrMessageComponent from "@/app/features/shared/components/form-err-message/form-err-message.component.vue";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import inputComponent from "@/app/features/shared/components/input-component/input.component.vue";
import loaderComponent from "@/app/features/shared/components/loader-component/loader.component.vue";
import { MainFeaturesRouter } from "@/app/features/shared/services/features-router.service";
import { InjectService } from "@/app/functions/inject-service.func";
import { _AuthRouteCallService } from "@/app/server/routes/auth-route-call/auth-route-call.service";
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
    components: {
        imageComponent,
        loaderComponent,
        formComponent,
        inputComponent,
        FormErrMessageComponent
    },

    setup() {
        const LoginImageUrl = APP_IMAGE_PATHs_CONFIGURATIONS.WELCOME,
        
        UsernameModel = ref<InstanceType<typeof inputComponent>>(),

        PasswordModel = ref<InstanceType<typeof inputComponent>>(),

        Loader = ref<InstanceType<typeof loaderComponent>>(),

        AuthApiCall = InjectService(_AuthRouteCallService),

        mainFeaturesRouter = new MainFeaturesRouter(),

        ErrorMessage = ref<string>()

        return{ 
            LoginImageUrl, 
            UsernameModel, 
            PasswordModel, 
            Loader, 
            AuthApiCall, 
            mainFeaturesRouter, 
            ErrorMessage
        }
    },

    methods: {
        Login () {
            
        },

        toSignup () {
          this.mainFeaturesRouter.toAuth("signup")  
        }
    }
})