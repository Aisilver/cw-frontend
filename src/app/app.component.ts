import { defineComponent, onMounted, ref } from 'vue'
import { _ModalService } from './main-services/modal-service/modal.service'

export default defineComponent({
  setup() {
    const MainModalDOMELement = ref<HTMLElement | null>(null)

    onMounted(() => {
        _ModalService.Initialize(MainModalDOMELement.value)
    })

    return { MainModalDOMELement }
  },
})
