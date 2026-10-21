import { createVNode, markRaw, reactive, render, type Component } from 'vue'
import gsap from 'gsap'
import { defineStore } from 'pinia'
import { BehaviorSubject } from 'rxjs'

type ModalStateTypes = 'close' | "pending" | "open"

type ModalParam = {component: any, inputs: any, onClose?: (param?: any) => void}

class ModalService {
  declare private modalDom: HTMLElement

  private Initialized = false

  private modalStateEvent = new BehaviorSubject<ModalStateTypes>('close')

  private animationDuration = 0.5

  private savedModals: ModalParam[] = []

  private modalPreState: gsap.TweenVars = {
    pointerEvents: "none",
    opacity: 0
  }

  private modalPostState: gsap.TweenVars = {
    pointerEvents: "all",
    opacity: 1
  }

  constructor () {
    this.modalStateEvent.subscribe(state => {
      if(this.Initialized) this.animationHandler(state)
    })
  }

  Initialize(modalDom: HTMLElement | null) {
    if (!modalDom) throw Error('Modal main DOM cannot be found')

    this.modalDom = modalDom

    gsap.set(this.modalDom, this.modalPreState)

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
        ev.next('close')

        render(null, modalDom)

        if(onClose) onClose(param) 
      },
    })

    render(vnode, this.modalDom)

    ev.next("open")
  }

  private openNextModal () {
    const nextModal = this.savedModals.shift()

    if(!nextModal) return

    const {component, inputs, onClose} = nextModal

    this.Open(component, inputs, onClose)
  }

  private animationHandler (state: ModalStateTypes) {
    if(state == 'open') {
      gsap.to(this.modalDom, {...this.modalPostState, duration: this.animationDuration})
    } else {
      gsap.from(this.modalDom, {...this.modalPostState, duration:this.animationDuration})

      .then(() => this.openNextModal())
    }
  }
}

export const _ModalService = defineStore("modal-service", () => {
  
  const state = reactive(new ModalService())

  return { state }
})