import { defineComponent, onMounted, ref } from 'vue'
import { _ModalService } from './main-services/modal-service/modal.service'
import { InjectService } from './functions/inject-service.func'
import { _ServerCallService } from './server/server-call.sevice'
import { _UserService } from './main-services/user-service/user.service'

export default defineComponent({
  setup() {
    const MainModalDOMELement = ref<HTMLElement | null>(null)

    onMounted(() => {
      const modalService = InjectService(_ModalService)

      modalService.Initialize(MainModalDOMELement.value)
    })

    return { MainModalDOMELement }
  },
})