import { defineComponent, ref } from "vue";
import logoComponent from "../logo-component/logo.component.vue";

type NavStateTypes = "logo-only"

export default defineComponent({
    components: {
        logoComponent
    },

    setup() {
        const navState = ref<NavStateTypes | null>(null)

        return { navState }
    },

    mounted() {
        this.navState = this.navStyle as NavStateTypes
    },

    props: {
        navStyle: {
            type: String
        }
    }
})