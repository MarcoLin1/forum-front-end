import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/feed',
    name: 'restaurant-feed',
    component: () => import('../views/RestaurantFeed.vue')
  },
  {
    path: '/restaurants/top',
    name: 'restaurant-top',
    component: () => import('../views/RestaurantsTop.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurant-dashboard',
    component: () => import('../views/RestaurantDashboard.vue')
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UserTop.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-profile-edit',
    component: () => import('../views/UserProfileEdit.vue')
  },
  {
    path: '/users/:id',
    name: 'user-profile',
    component: () => import('../views/User.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants'
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue')
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('./../views/AdminRestaurantNew.vue')
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('./../views/AdminRestaurantEdit.vue')
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue')
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  // 取出localStorage的token
  const token = localStorage.getItem('token')

  // 預設尚未驗證
  let isAuthenticated = false

  // 如果token有效，isAuthenticated就會是fetchCurrentUser回傳的true or false認定 (dispatch是呼叫 Vuex 中的actions)
  if (token) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 不需要token驗證的頁面
  const pathWithoutAuthenticated = ['sign-in', 'sign-up']

  // 如果驗證無效，且要去的地方是要驗證的頁面，就轉到signin
  if (!isAuthenticated && !pathWithoutAuthenticated.includes(to.name)) {
    next('/signin')
    return
  }
  // 如果驗證有效，且要去的地方是不用驗證的頁面，就轉到餐廳首頁
  if (isAuthenticated && pathWithoutAuthenticated.includes(to.name)) {
    next('/restaurants')
    return
  }
  next()
})

export default router
