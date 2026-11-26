import { Subject } from "@/app/classes/subject-event/subject-event.class";
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";
import { InjectService } from "@/app/functions/inject-service.func";
import type { ImageUploaderData } from "@/app/interfaces/image-uploader-data.int";
import { _MediaRouteCallService } from "@/app/server/routes/media-route-call/media-route-call.service";
import type { AcceptedFileExtTypes } from "@shared/entities";
import { defineComponent, ref } from "vue";

type ImageUploaderEventdata = {
    stage: "started" | "completed";
    error?: any;
    payload?: ImageUploaderData;
}

export default defineComponent({
    setup () {
        const events = new Subject<ImageUploaderEventdata>(),

        FileInputElement = ref<HTMLInputElement | null>(null),

        AllowedExtensions: AcceptedFileExtTypes[] = ["jpeg", "jpg", "png"]

        return { events, FileInputElement, AllowedExtensions }
    },

    mounted() {
        if(!this.FileInputElement) return

        this.FileInputElement.accept = this.AllowedExtensions.map(ex => `.${ex}`).join(",")

        this.FileInputElement.multiple = false
    },

    methods: {
        Upload () {
            this.FileInputElement?.click()
        },

        async OnFileInput (e: Event) {
            const {files} = e.target as HTMLInputElement,

            MediaApiCall = InjectService(_MediaRouteCallService),

            file = files?.item(0)

            if(!file) return

            const clientUrl = URL.createObjectURL(file)
            
            try {
                this.events.emit({stage: "started"})
            
                const res = await MediaApiCall.ulploadTempFile(file)

                MediaApiCall.responseChecker(res, data => { 
                    const payload: ImageUploaderData = {
                       imgRef: data.fileRef,
                       clientUrl 
                    }

                    this.events.emit({stage: "completed", payload})
                })
            } catch (error: any){
                this.events.emit({stage: "started", error})
            }
        }
    }
})