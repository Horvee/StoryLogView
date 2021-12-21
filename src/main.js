import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import ElementPlus from 'element-plus'
// import * as Icons from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'

// const app = createApp(App);
// app.use(ElementPlus);
// app.mount('#app')



const app = createApp(App).use(router);

app.use(ElementPlus);
// for (let iconName in Icons) {
//     app.component(iconName, Icons[iconName]);
// }
app.mount('#app')
