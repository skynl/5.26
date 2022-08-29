import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassifyView from '../views/ClassifyView.vue'
import SearchView from '../views/SearchView.vue'
import ProductView from '../views/ProductView.vue'
import ClassifyDetailView from '../views/ClassifyDetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
let CartView = () => import('../views/CartView.vue')
let UserView = () => import('../views/UserView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/classify',
    name: 'classify',
    component: ClassifyView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    // meta:{transition:'slide-right'}
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView,
    // meta:{transition:'slide-right'}
  },
  {
    path: '/classify_detail',
    name: 'classify_detail',
    component: ClassifyDetailView,
    // meta:{transition:'slide-right'}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    // meta:{transition:'slide-right'}
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    // meta:{transition:'slide-right'}
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  let TOKEN = window.localStorage.getItem('token')
  if((to.name == 'cart' || to.name == 'user') && !TOKEN ){
    next({name:'login'})
  }
  next();
})

export default router
