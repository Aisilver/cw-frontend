import { APP_IMAGE_PATHs_CONFIGURATIONS } from "@/app/configurations/image-paths.config";
import formComponent from "@/app/features/shared/components/form-component/form.component.vue";
import FormErrMessageComponent from "@/app/features/shared/components/form-err-message/form-err-message.component.vue";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import inputComponent from "@/app/features/shared/components/input-component/input.component.vue";
import loaderComponent from "@/app/features/shared/components/loader-component/loader.component.vue";
import { MainFeaturesRouter } from "@/app/features/shared/services/features-router.service";
import { Delay } from "@/app/functions/delay.func";
import { InjectService } from "@/app/functions/inject-service.func";
import { _UserService } from "@/app/main-services/user-service/user.service";
import { _AuthRouteCallService } from "@/app/server/routes/auth-route-call/auth-route-call.service";
import type { SigninCredentials } from "@shared/routes";
import { defineComponent, ref } from "vue";

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

        SignInCred = ref<SigninCredentials>({username: "", password: ""}),
        
        UsernameModel = ref<InstanceType<typeof inputComponent>>(),

        PasswordModel = ref<InstanceType<typeof inputComponent>>(),

        Loader = ref<InstanceType<typeof loaderComponent>>(),

        AuthApiCall = InjectService(_AuthRouteCallService),

        UserService = InjectService(_UserService),

        mainFeaturesRouter = new MainFeaturesRouter(),

        ErrorMessage = ref<string>()

        return{ 
            SignInCred,
            LoginImageUrl, 
            UsernameModel, 
            PasswordModel, 
            Loader, 
            AuthApiCall,
            UserService,
            mainFeaturesRouter, 
            ErrorMessage
        }
    },

    methods: {
        async Login () {
            if(!this.Loader) return

            const response = await this.Loader.load(
                () => this.AuthApiCall.login(this.SignInCred),
            {"spinner-loader": {spinnerSize: 20}})

            this.AuthApiCall.responseChecker(response, 
                payload => {
                    this.UserService.setAccessToken(payload.auth_key)

                    this.UserService.setAccount(payload.account)

                    this.mainFeaturesRouter.toApp(this.UserService.MyAccount.userName)
                },

                errMessage => {
                    this.ErrorMessage = errMessage

                    Delay(2000).then(() => this.ErrorMessage = undefined)
                }
            )
        },

        toSignup () {
          this.mainFeaturesRouter.toAuth("signup")  
        }
    }
})