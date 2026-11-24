import { APP_IMAGE_PATHs_CONFIGURATIONS } from "@/app/configurations/image-paths.config";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import loaderComponent from "@/app/features/shared/components/loader-component/loader.component.vue";
import { InjectService } from "@/app/functions/inject-service.func";
import { _AuthRouteCallService } from "@/app/server/routes/auth-route-call/auth-route-call.service";
import { defineComponent, ref } from "vue";
import { _SignupService } from "../../services/sign-up.service";
import { MainFeaturesRouter } from "@/app/features/shared/services/features-router.service";

export default defineComponent({
    components: {
        loaderComponent,
        imageComponent
    },

    setup () {
        const AccountCreated = ref<boolean | null>(null),

        loader = ref<InstanceType<typeof loaderComponent> | null>(null),

        service = InjectService(_SignupService),

        mainFeaturesRouter = new MainFeaturesRouter(),

        AuthApiCall = InjectService(_AuthRouteCallService)

        return { AccountCreated, loader, AuthApiCall, service, mainFeaturesRouter}
    },

    mounted () {
        this.CreateAccount()
    },

    methods: {
        async CreateAccount () {
            if(!this.loader) return

            const response = await this.loader.load(
                () => this.AuthApiCall.createAccount(this.service.Payload),
                {
                    "spinner-loader": {
                        spinnerSize: 80
                    }
                }
            )

            this.AccountCreated = this.AuthApiCall.responseChecker(response)
        },
 
        ToLogin () {
            this.mainFeaturesRouter.toAuth()
        }
    },

    computed: {
        ImageUrl () {
            const {SERVER_FAILED, WELCOME} = APP_IMAGE_PATHs_CONFIGURATIONS

            return this.AccountCreated ? WELCOME : SERVER_FAILED
        },

        HeaderText () {
            return this.AccountCreated ? "account created successfully" : "failed to create account"
        }
    }
})