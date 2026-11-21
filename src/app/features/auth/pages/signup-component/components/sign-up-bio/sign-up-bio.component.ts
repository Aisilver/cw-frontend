import { InjectService } from '@/app/functions/inject-service.func'
import { defineComponent, ref } from 'vue'
import { _SignupService } from '../../services/sign-up.service.ts'
import type { Roles } from '@shared/common/roles-type.js'
import signUpRoleSelectComponent from './components/role-select/sign-up-role-select.component.vue'
import inputComponent from '@/app/features/shared/components/input-component/input.component.vue'
import formComponent from '@/app/features/shared/components/form-component/form.component.vue'
import signUpRoleImageCarouselComponent from './components/role-image-carousel/sign-up-role-image-carousel.component.vue'
import FormErrMessageComponent from '@/app/features/shared/components/form-err-message/form-err-message.component.vue'
import radioComponent from '@/app/features/shared/components/radio-component/radio.component.vue'
import { APP_ENTITY_DUMMY_DATA } from '@/app/configurations/dummy-entity-data.config.ts'

export default defineComponent({
  components: {
    signUpRoleSelectComponent,
    signUpRoleImageCarouselComponent,
    formComponent,
    FormErrMessageComponent,
    inputComponent,
    radioComponent
  },

  setup() {
    const service = InjectService(_SignupService),

    FormComponent = ref<InstanceType<typeof formComponent>>(),

    FirstNameModel = ref<InstanceType<typeof inputComponent>>(),

    LastNameModel = ref<InstanceType<typeof inputComponent>>(),

    Role = ref<Roles>(service.Role.getValue()),

    NewUser = ref(service.NewUser ?? APP_ENTITY_DUMMY_DATA.USER)

    return { 
      service, 
      Role, 
      NewUser, 
      FormComponent,
      FirstNameModel,
      LastNameModel
    }
  },

  methods: {
    onRoleChange() {
      this.Role = this.service.Role.getValue()
    },

    Next () {
      this.service.setUser(this.NewUser)

      this.service.toAccountSetup()
    }
  }
})
