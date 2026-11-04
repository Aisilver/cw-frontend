import { createVNode, render, type Component } from 'vue'
import { DefineService } from '@/app/functions/define-service.func'
import { Animator } from '@/app/functions/animator.func'
import { BehaviouralSubject } from '@/app/classes/subject-event/behavioural-subject-event.class'

type ModalStateTypes = 'close' | "pending" | "open"

type ModalParam = {component: any, inputs: any, onClose?: (param?: any) => void}

class ModalService {
  declare private modalDom: HTMLElement

  private Initialized = false

  private modalStateEvent = new BehaviouralSubject<ModalStateTypes>("close")

  private animationDuration = 0.5

  private savedModals: ModalParam[] = []

  private animator = new Animator()

  private modalPreState: Partial<CSSStyleDeclaration> = {
    pointerEvents: "none",
    opacity: "0"
  }

  private modalPostState: Partial<CSSStyleDeclaration> = {
    pointerEvents: "all",
    opacity: "0"
  }

  constructor () {
    this.modalStateEvent.subscribe(state => {
      if(this.Initialized) this.animationHandler(state)
    })
  }

  Initialize(modalDom: HTMLElement | null) {
    if (!modalDom) throw Error('Modal main DOM cannot be found')

    this.modalDom = modalDom

    this.animator.set(this.modalDom, this.modalPreState)

    this.Initialized = true 

  }

  Open(component: Component, inputs: any, onClose?: (param?: any) => void) {

    if(this.modalStateEvent.getValue() == 'open') {
      this.savedModals.push({component, inputs})
      return
    }

    const modalDom = this.modalDom, 

    ev = this.modalStateEvent,
        
    vnode = createVNode(component, {
      ...inputs,

      async onClose(param?: any) {
        ev.emit('close')

        render(null, modalDom)

        if(onClose) onClose(param) 
      },
    })

    render(vnode, this.modalDom)

    ev.emit("open")
  }

  private openNextModal () {
    const nextModal = this.savedModals.shift()

    if(!nextModal) return

    const {component, inputs, onClose} = nextModal

    this.Open(component, inputs, onClose)
  }

  private animationHandler (state: ModalStateTypes) {
    if(state == 'open') {
      this.animator.to(this.modalDom, {...this.modalPostState, duration: this.animationDuration})
    } else {
      this.animator.from(this.modalDom, {...this.modalPostState, duration:this.animationDuration})

      .then(() => this.openNextModal())
    }
  }
}

export const _ModalService = DefineService("modal-service", new ModalService())