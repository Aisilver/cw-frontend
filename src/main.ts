import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app/app.component.vue'
import router from './router'
import { Initializers } from './app/initializers/initializer.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router);

(async () => {
    for (const initializer of Initializers) {
        await initializer()
    }

    app.mount('#app')
})();

