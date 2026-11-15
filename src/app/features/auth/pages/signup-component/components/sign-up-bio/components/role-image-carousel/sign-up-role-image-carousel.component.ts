import { defineComponent, ref } from "vue";
import { APP_IMAGE_PATHs_CONFIGURATIONS } from '@/app/configurations/image-paths.config.ts'
import imageComponent from "@/app/features/shared/components/image-component/image.component.vue";


export default defineComponent({
    components: {
        imageComponent
    },
    
    props: {
        Role: {
            type: String,
            required: true
        }
    },

    setup () {
        const ParentImgSrc = ref(APP_IMAGE_PATHs_CONFIGURATIONS.SIGN_UP_PARENT_IMAGE),

        StudentImgSrc =  ref(APP_IMAGE_PATHs_CONFIGURATIONS.SIGN_UP_STUDENT_IMAGE),

        TeacherImgSrc =  ref(APP_IMAGE_PATHs_CONFIGURATIONS.SIGN_UP_TEACHER_IMAGE)

        return { StudentImgSrc, ParentImgSrc, TeacherImgSrc }
    }
})