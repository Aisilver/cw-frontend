import { Validator } from '@/app/abs-classes/validator.abs.class'
import type { InputModel } from '@/app/interfaces/input-model-element.int'
import type { ValidatorConstructor } from '@/app/interfaces/validator.int'
import { defineComponent, inject, ref, type InjectionKey, type PropType } from 'vue'
import { RequiredValidator } from '../../validators/Required.validator'
import type { FormContext } from '@/app/interfaces/form-context.int'
import { Subject } from '@/app/classes/subject-event/subject-event.class'
import type { Subscription } from '@/app/classes/subject-event/types'
import iconComponent from '../icon-component/icon.component.vue'

export default defineComponent({
  components: {
    iconComponent
  },

  props: {
    formContextKey: {
      type: Symbol as PropType<InjectionKey<FormContext>>
    },

    validateOnBlur: {
      type: Boolean
    }
  },

  setup(props) {
    if(!props.formContextKey) throw Error("Form context key cannot be found")

    const FormContext = inject<FormContext>(props.formContextKey),
    
      PlaceHolder = ref<string | null>(null),

      Name = ref<string>("unknown"),
            
      LabelHolderElement = ref<HTMLElement | null>(null),

      InputElement = ref<HTMLInputElement | null>(null),

      TypeOfInputIsPassword = ref(false),

      PasswordIsHidden = ref(true),
            
      HasValue = ref(false),
      
      Model = ref<InputModel>({pristine: true}),

      innerModelChangeEvent = new Subject<InputModel>(),

      innerModelChangeEventSubs = ref<Subscription | null>(null),
      
      Validators = ref<Validator[]>([]),

      ErrorMap = ref(new Map<string, Record<string, boolean>>()),

      IsvalidatingAsync = ref(false)

    return {
      FormContext,
      PlaceHolder,
      Name,
      LabelHolderElement,
      InputElement,
      TypeOfInputIsPassword,
      PasswordIsHidden,
      HasValue,
      Model,
      innerModelChangeEvent,
      innerModelChangeEventSubs,
      Validators,
      ErrorMap,
      IsvalidatingAsync
    }
  },

  mounted() {
    this.InputElement = this.LabelHolderElement?.querySelector('input') ?? null

    if (!this.InputElement) throw Error('No input element was passed')

    const {name, placeholder} = this.InputElement

    if (!name) throw Error('No input name defined')

    this.innerModelChangeEventSubs = this.innerModelChangeEvent.subscribe(model => this.onModelChange(model))

    this.Name = name

    this.PlaceHolder = placeholder

    this.TypeOfInputIsPassword = this.InputElement.type == "password"

    this.InputElement.placeholder = ''

    this.InputElement.oninput =  async ev => this.onInput(ev.target as HTMLInputElement)
    
    this.InputElement.onblur = ev => this.onBlur(ev.target as HTMLInputElement)

    this.InputElement.onfocus = () => this.onFocus()

    if(this.InputElement.required) this.addValidator(RequiredValidator) 
    
    else this.PlaceHolder += ' (Optional)' 

    this.RunValidation(this.InputElement)

    this.HasValue = this.InputElement.value.trim() != ""
  },

  computed: {
    HasError () {
      const {dirty, errors } = this.Model

      if(this.validateOnBlur && this.HasValue && errors?.['required']) return false

      return dirty != undefined && errors != undefined
    }
  },

  methods: {
    async runValidations (input: HTMLInputElement){

      let errors: Record<string, boolean> = {}

      for (const validator of this.Validators) {

        const {id} = validator

        const err = await validator.validate(input)

        if(err) this.ErrorMap.set(id, err)

        else this.ErrorMap.delete(id)
      }

      for (const [key, error] of this.ErrorMap.entries()) {
        Object.assign(errors, error)
      }

      return Object.entries(errors).length > 0 ? errors : null
    },

    async RunValidation (input: HTMLInputElement) {
      this.innerModelChangeEvent.emit({...this.Model, errors: undefined, pendingEvaluation: true})

      const errors = await this.runValidations(input); 
      
      this.innerModelChangeEvent.emit({...this.Model, pendingEvaluation: false, errors}) 
    },

    onModelChange (model: InputModel) {
      this.FormContext?.registerField(this.Name, model)

      this.Model = model
    },

    onInput (input: HTMLInputElement) {
      this.HasValue = input.value.trim() != ""

      if(!this.validateOnBlur) this.RunValidation(input)

      this.innerModelChangeEvent.emit(Object.assign(this.Model, {pristine: false, dirty: true}))
    },
    
    async onBlur(input: HTMLInputElement){
      if(this.validateOnBlur) await this.RunValidation(input)

      this.HasValue = input.value.trim() != ""

    }, 

    onFocus(){
      this.HasValue = true
    },

    startAsyncValidationProcess() {
      this.InputElement?.blur()

      this.IsvalidatingAsync = true
    },

    endAsyncValidationProcess() {
      this.IsvalidatingAsync = false
    },

    addValidator(ValidatorClass: ValidatorConstructor) {
      const val = new ValidatorClass()

      //@ts-ignore
      val.setComponentInstance(this)

      this.Validators.push(val)
    },

    TogglePasswordView () {
      if(!this.InputElement) return

      const {type} = this.InputElement

      if(type == "text") this.InputElement.type = "password"

      else this.InputElement.type = "text"

      this.PasswordIsHidden = this.InputElement.type == "password"
    }
  },

  beforeUnmount() {
    if(this.Name) this.FormContext?.unregisterField(this.Name)

    this.innerModelChangeEventSubs?.unsubscribe()
  }
})
