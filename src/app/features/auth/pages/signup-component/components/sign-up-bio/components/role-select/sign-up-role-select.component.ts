import { InjectService } from '@/app/functions/inject-service.func'
import type { Roles } from '@shared/common'
import { defineComponent, ref } from 'vue'
import type { Subscription } from '@/app/classes/subject-event/types'
import { _SignupService } from '../../../../services/sign-up.service'

export default defineComponent({
  setup() {
    const service = InjectService(_SignupService),
      RoleValues = ref<Roles[]>(['parent', 'student', 'teacher'])

    let Role = ref(service.Role.getValue()),
      roleChangeSubs!: Subscription

    return { service, RoleValues, Role, roleChangeSubs }
  },

  mounted() {
    this.roleChangeSubs = this.service.Role.subscribe((role) => (this.Role = role))
  },

  methods: {
    SelectRole(role: Roles) {
      this.service.Role.emit(role)
    },
  },
})
