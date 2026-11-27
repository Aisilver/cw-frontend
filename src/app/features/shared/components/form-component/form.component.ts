import { defineComponent, provide, ref, type InjectionKey } from "vue";
import type { InputModel } from "@/app/interfaces/input-model-element.int";
import type { FormContext } from "@/app/interfaces/form-context.int";
import { Subject } from "@/app/classes/subject-event/subject-event.class";
import type { Subscription } from "@/app/classes/subject-event/types";

export default defineComponent({
    emits: ["submit"],
    
    setup() {
        const inputModelMap = new Map<string, InputModel>(),

        formKey: InjectionKey<FormContext> = Symbol("FORM_KEY"),

        onInputsModelChange = new Subject<void>(),

        onInputsModelChangeSubs = ref<Subscription | null>(null),

        valid = ref(false),

        formContext: FormContext = {
            registerField(name, field) {
                inputModelMap.set(name, field);

                onInputsModelChange.emit()
            },

            unregisterField(name) {
                inputModelMap.delete(name);
            }
        };

        provide(formKey, formContext)

        return { inputModelMap, formKey, onInputsModelChange, onInputsModelChangeSubs, valid}
    },

    mounted() {
        this.onInputsModelChangeSubs = this.onInputsModelChange.subscribe(() => {
            try {
                for (const [name, model] of this.inputModelMap.entries()) {
                    const {errors, pendingEvaluation} = model

                    if(errors || pendingEvaluation) throw Error()
                }

                this.valid = true
            } catch {
                this.valid = false
            }
        })
    },
  
    methods: {
        setModelForCheck(name: string, model: InputModel) {            
            this.inputModelMap.set(name, model)
        }
    },

    beforeUnmount() {
        this.onInputsModelChangeSubs?.unsubscribe()
    }
})