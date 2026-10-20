import { createVNode, render, type Component } from 'vue'
import gsap from 'gsap'

class ModalService {
  declare private modalDom: HTMLElement

  private modalAnimation = gsap.timeline({ paused: true })

  private animationDuration = 1.5

  Initialize(modalDom: HTMLElement | null) {
    if (!modalDom) throw Error('Modal main DOM cannot be found')

    this.modalDom = modalDom

    this.setAnimation()

    this.modalAnimation.play()
  }

  async Open(component: Component, inputs: any, onClose?: () => void) {
    const modalDom = this.modalDom, 
    
    modalAnimation = this.modalAnimation,
    
    vnode = createVNode(component, {
      ...inputs,

      async onClose() {
        await modalAnimation.reverse()

        render(null, modalDom)

        if(onClose) onClose()
      },
    })

    render(vnode, this.modalDom)

    await this.modalAnimation.play()
  }

  private setAnimation() {
    this.modalAnimation.fromTo(
      this.modalDom,
      {
        opacity: 0,
        pointerEvents: "none"
      },
      {
        opacity: 1,
        pointerEvents: "all",
        duration: this.animationDuration
      },
    )
  }
}

export const _ModalService = new ModalService()
