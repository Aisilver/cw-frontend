import { InjectService } from '@/app/functions/inject-service.func'
import { defineComponent, ref } from 'vue'
import { _SignupService } from '../../services/sign-up.service.ts'
import type { Roles } from '@shared/common/roles-type.js'
import signUpRoleSelectComponent from './components/role-select/sign-up-role-select.component.vue'
import inputComponent from '@/app/features/shared/components/input-component/input.component.vue'
import formComponent from '@/app/features/shared/components/form-component/form.component.vue'
import signUpRoleImageCarouselComponent from './components/role-image-carousel/sign-up-role-image-carousel.component.vue'

export default defineComponent({
  components: {
    signUpRoleSelectComponent,
    signUpRoleImageCarouselComponent,
    formComponent,
    inputComponent
  },

  setup() {
    const service = InjectService(_SignupService),

    FormComponent = ref<InstanceType<typeof formComponent>>(),

    FirstNameModel = ref<InstanceType<typeof inputComponent>>(),

    LastNameModel = ref<InstanceType<typeof inputComponent>>(),

    Role = ref<Roles>(service.Role.getValue()),

    NewUser = ref(service.getNewUserObject())

    return { 
      service, 
      Role, 
      NewUser, 
      FormComponent,
      FirstNameModel,
      LastNameModel
    }
  },

  updated() {
  },

  mounted() {
  },

  methods: {
    onRoleChange(role: Roles) {
      this.Role = role
    },

    Next () {

    }
  }
})
