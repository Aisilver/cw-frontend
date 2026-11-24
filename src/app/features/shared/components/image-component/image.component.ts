import { Animator } from '@/app/classes/animator/animator.class'
import { defineComponent, ref } from 'vue'
import loaderComponent from '../loader-component/loader.component.vue'
import { APP_IMAGE_PATHs_CONFIGURATIONS } from '@/app/configurations/image-paths.config.ts'
import { Delay } from '@/app/functions/delay.func.ts'

type DefaultImageTypes = 'no-user' | 'no-image'

export default defineComponent({
  components: {
    loaderComponent,
  },

  props: {
    src: {
      type: String,
    },

    defaultImage: {
      type: String,
    },

    objectFit: {
      type: String,
    },
  },

  setup() {
    const ImgElement = ref<HTMLImageElement | null>(null),
      
    animator = new Animator(),

    loader = ref<InstanceType<typeof loaderComponent> | null>(null)

    return { ImgElement, animator, loader }
  },

  mounted() {
    this.setImageFit(this.objectFit)

    this.loadImage()
  },

  watch: {
    src() {
      this.loadImage()
    },

    objectFit(value) {
      this.setImageFit(value)
    }
  },
  
  methods: {
    setImageFit (fit = "cover") {
      if(this.ImgElement) this.animator.set(this.ImgElement, { objectFit: fit })
    },

    getDefaultImage(imgKey: DefaultImageTypes = 'no-image') {
      const {USER_ICON, NO_IMAGE} = APP_IMAGE_PATHs_CONFIGURATIONS

      switch (imgKey) {
        case 'no-user':
          return USER_ICON

        default:
          return NO_IMAGE
      }
    },

    loadImage() {
        if(!this.loader) return

        const defaultImage = this.getDefaultImage(this.defaultImage as DefaultImageTypes),
        
        url = this.src ?? defaultImage

        this.loader.load(() => new Promise<void>((res) => {
          let imgLoaded = false

          if(!this.ImgElement) throw Error("image element cannot be found")

          this.ImgElement.onload = () => {
            imgLoaded = true;

            res()
          }

          Delay(10_000).then(() => {
            if(!this.ImgElement || imgLoaded) return

            this.ImgElement.src = defaultImage 
          })

          this.ImgElement.src = url
        }))

        .then(() => {
          if(this.ImgElement) this.animator.from(this.ImgElement, {opacity: "0", duration: 3})
        })
    }
  },
})
