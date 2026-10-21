import { _ModalService } from '@/app/main-services/modal-service/modal.service'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import DialogueComponent from "./dialogue-modal/dialogue-modal.component.vue"

class GCModalService {
    private modal = _ModalService().state

    openDialogue = () => this.modal.Open(DialogueComponent, {})
}

export const _GCModalService = defineStore('gcmodal-service', () => {
    const state = reactive(new GCModalService())

    return { state }
})
