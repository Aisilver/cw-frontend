import { InjectService } from '@/app/functions/inject-service.func'
import { defineComponent, ref } from 'vue'
import { _SignupService } from '../../services/sign-up.service.ts'
import type { Subscription } from '@/app/classes/subject-event/types.ts'
import type { Roles } from '@shared/common/roles-type.js'
import signUpRoleSelectComponent from './components/role-select/sign-up-role-select.component.vue'
import imageComponent from '@/app/features/shared/components/image-component/image.component.vue'
import { APP_IMAGE_PATHs_CONFIGURATIONS } from '@/app/configurations/image-paths.config.ts'

export default defineComponent({
  components: {
    signUpRoleSelectComponent,
    imageComponent
  },

  setup() {
    const {SIGN_UP_PARENT_IMAGE, SIGN_UP_STUDENT_IMAGE, SIGN_UP_TEACHER_IMAGE} = APP_IMAGE_PATHs_CONFIGURATIONS,
    
    service = InjectService(_SignupService),

    imageSrc = ref({
        parent: SIGN_UP_PARENT_IMAGE,
    
        student: SIGN_UP_STUDENT_IMAGE,

        teacher: SIGN_UP_TEACHER_IMAGE
    }),

    Role = ref(service.Role.getValue())

    let roleChangeSubs: Subscription | undefined

    return { service, roleChangeSubs, imageSrc, Role }
  },

  mounted() {
    this.roleChangeSubs = this.service.Role.subscribe(role => this.onRoleChange(role))
  },

  methods: {
    onRoleChange(role: Roles) {
        this.Role = role
    }
  },

  unmounted() {
    this.roleChangeSubs?.unsubscribe()
  }
})
