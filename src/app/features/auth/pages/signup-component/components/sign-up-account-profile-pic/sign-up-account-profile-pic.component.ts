import iconComponent from "@/app/features/shared/components/icon-component/icon.component.vue";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import loaderComponent from "@/app/features/shared/components/loader-component/loader.component.vue";
import { InjectService } from "@/app/functions/inject-service.func";
import { _MediaRouteCallService } from "@/app/server/routes/media-route-call/media-route-call.service";
import type { AcceptedFileExtTypes } from "@shared/entities";
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {
        imageComponent,
        loaderComponent,
        iconComponent
    },

    setup () {
        const ProfileImgClientUrlStorageKey = "profile-img-key",
        
        ProfileImgUrl = ref<string | null>(sessionStorage.getItem(ProfileImgClientUrlStorageKey)),

        FileInputElement = ref<HTMLInputElement | null>(null),

        FileUploadLoader = ref<InstanceType<typeof loaderComponent> | null>(null),

        AllowedExtensions: AcceptedFileExtTypes[] = ["jpeg", "jpg", "png"]

        return { ProfileImgClientUrlStorageKey, ProfileImgUrl, FileInputElement, AllowedExtensions, FileUploadLoader}
    },

    mounted() {
        if(!this.FileInputElement) return

        this.FileInputElement.accept = this.AllowedExtensions.map(ex => `.${ex}`).join(",")

        this.FileInputElement.multiple = false
    },

    methods: {
        async OnFileInput (e: Event) {
            const {files} = e.target as HTMLInputElement,

            MediaApiCall = InjectService(_MediaRouteCallService),

            file = files?.item(0)

            if(!file || !this.FileUploadLoader) return

            const clientUrl = URL.createObjectURL(file),
            
            res = await this.FileUploadLoader.load(() => MediaApiCall.ulploadTempFile(file), {"spinner-loader": {spinnerSize: 20}})

            MediaApiCall.responseChecker(res, data => { 
                const {fileRef} = data

                sessionStorage.setItem(this.ProfileImgClientUrlStorageKey, clientUrl)

                this.ProfileImgUrl = clientUrl

                this.$emit("profile_image_ref", fileRef)
            })
        }
    }
})