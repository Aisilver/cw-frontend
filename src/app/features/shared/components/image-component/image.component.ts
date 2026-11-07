import { Animator } from '@/app/classes/animator/animator.class'
import { defineComponent, ref } from 'vue'
import loaderComponent, { type default as LoaderComponentType } from '../loader-component/loader.component.vue'
import { APP_IMAGE_PATHs_CONFIGURATIONS } from '@/app/configurations/image-paths.config.ts'

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

    loader = ref<InstanceType<typeof LoaderComponentType> | null>(null)

    return { ImgElement, animator, loader }
  },

  mounted() {
    if (!this.ImgElement) return

    this.animator.set(this.ImgElement, { objectFit: this.objectFit ?? 'cover' })

    this.loadImage()
  },

  watch: {
    src() {
        this.loadImage()
    }
  },
  
  methods: {
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

        const url = this.src ?? this.getDefaultImage(this.defaultImage as DefaultImageTypes)

        this.loader?.load(() => new Promise<void>((res) => {

            if(!this.ImgElement) throw Error("image element cannot be found")

            this.ImgElement.onload = () => res()

            this.ImgElement.src = url
        }))
    }
  },
})
