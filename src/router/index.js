import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Form1 from '../views/Form1.vue'


Vue.use(VueRouter)

const routes = [
  {
    // 設定根目錄的轉址
    path: '/',
    name: 'root',
    redirect: '/1'
  },
  {
    path: '/1',
    name: 'Form1',
    component: Form1
  },
  {
    path: '/2',
    name: 'Form2',
    component: () => import ('../views/Form2.vue')
  },
  {
    path: '/3',
    name: 'Form3',
    component: function () {
      return import ('../views/Form3.vue')
    }
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
