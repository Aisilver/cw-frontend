import { _ModalService } from '@/app/main-services/modal-service/modal.service'
import DialogueComponent from "./dialogue-modal/dialogue-modal.component.vue"
import { InjectService } from '@/app/functions/inject-service.func.ts'
import { DefineService } from '@/app/functions/define-service.func.ts'

class GCModalService {
    private modalService = InjectService(_ModalService)

    openDialogue = () => this.modalService.Open(DialogueComponent, {})
}

export const _GCModalService = DefineService('gcmodal-service', new GCModalService())