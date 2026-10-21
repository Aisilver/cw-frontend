import { defineComponent, onMounted, ref } from 'vue'
import { _ModalService } from './main-services/modal-service/modal.service'

export default defineComponent({
  setup() {
    const MainModalDOMELement = ref<HTMLElement | null>(null)

    onMounted(() => {
      const modalService = _ModalService()

      modalService.state.Initialize(MainModalDOMELement.value)
    })

    return { MainModalDOMELement }
  },
})
