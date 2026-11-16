import { InjectService } from '@/app/functions/inject-service.func'
import { defineComponent, ref } from 'vue'
import { _SignupService } from './services/sign-up.service.ts'
import signUpBioComponent from './components/sign-up-bio/sign-up-bio.component.vue'
import type { Subscription } from '@/app/classes/subject-event/types'
import signUpAccountComponent from './components/sign-up-account/sign-up-account.component.vue'

export default defineComponent({
  components: {
    signUpBioComponent,
    signUpAccountComponent
  },

  setup() {
    const service = InjectService(_SignupService),

    Stage = ref(service.SignUpStage.getValue()),
      
    stageChangeSubs = ref<Subscription | undefined>()

    return { service, Stage, stageChangeSubs }
  },

  mounted() {
    this.stageChangeSubs = this.service.SignUpStage.subscribe((stage) => {
      this.Stage = stage
    })
  },

  beforeUnmount() {
    this.stageChangeSubs?.unsubscribe()
  }
})
