import { InjectService } from '@/app/functions/inject-service.func'
import { defineComponent, ref } from 'vue'
import { _SignupService } from './services/sign-up.service.ts'
import imageComponent from '@/app/features/shared/components/image-component/image.component.vue'
import signUpBioComponent from './components/sign-up-bio/sign-up-bio.component.vue'
import type { Subscription } from '@/app/classes/subject-event/types'
import type { SignUpStagesTypes } from './types'

export default defineComponent({
  components: {
    signUpBioComponent,
  },

  setup() {
    const service = InjectService(_SignupService)

    let Stage = ref(service.SignUpStage.getValue()),
      
    stageChangeSubs!: Subscription | undefined

    return { service, Stage, stageChangeSubs }
  },

  mounted() {
    this.stageChangeSubs = this.service.SignUpStage.subscribe((stage) => {
      this.Stage = stage
    })
  },

  methods: {

  }
})
