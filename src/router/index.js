import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'
import store from '../store'

Vue.use(VueRouter)

const authorizationIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/not-found')
    return
  }
  next()
}

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
    component: () => import('../views/AdminRestaurants.vue'),
    beforeEnter: authorizationIsAdmin
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('./../views/AdminRestaurantNew.vue'),
    beforeEnter: authorizationIsAdmin
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue'),
    beforeEnter: authorizationIsAdmin
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('./../views/AdminRestaurantEdit.vue'),
    beforeEnter: authorizationIsAdmin
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue'),
    beforeEnter: authorizationIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizationIsAdmin
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
  // ??????localStorage???token??????store????????????token
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token

  // ??????store????????????isAuthenticated??????
  let isAuthenticated = store.state.isAuthenticated

  // ??????localStorage token?????????????????????localStorage???store??????token????????????????????????????????????????????? (dispatch????????? Vuex ??????actions)
  if (tokenInLocalStorage && tokenInStore !== tokenInLocalStorage) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // ?????????token???????????????
  const pathWithoutAuthenticated = ['sign-in', 'sign-up']

  // ????????????????????????????????????????????????????????????????????????signin
  if (!isAuthenticated && !pathWithoutAuthenticated.includes(to.name)) {
    next('/signin')
    return
  }
  // ???????????????????????????????????????????????????????????????????????????????????????
  if (isAuthenticated && pathWithoutAuthenticated.includes(to.name)) {
    next('/restaurants')
    return
  }
  next()
})

export default router
