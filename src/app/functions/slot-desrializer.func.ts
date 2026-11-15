import type { Slots } from "vue"

export function SlotDeserializer (slots: Slots, slotKey?: string) {
    return {
        getComponent(index = 0) {
            
        },

        getDOM(index = 0): HTMLElement | null {
            const slot = slots[`${slotKey ? slotKey : 'default'}`]?.(),

            vnode = slot?.[index]

            if(!vnode) return null

            console.log(vnode)

            const element = vnode.el

            return element instanceof HTMLElement ? element : null
        }
    }
} 