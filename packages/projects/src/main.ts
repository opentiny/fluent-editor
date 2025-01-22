import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomeView from './views/home/Home.vue'
import YuQueView from './views/yuque/YuQue.vue'
import NotFoundComponent from './components/NotFound.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/yuque', component: YuQueView },
  { path: '/:pathMatch(.*)', component: NotFoundComponent },
]

const router = createRouter({
  history: createWebHistory('/tiny-editor/projects'),
  routes,
})

router.addRoute({ path: '/', component: HomeView })

createApp(App).use(router).mount('#app')
