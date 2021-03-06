<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        人氣餐廳
      </h1>
      <hr>
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="card mb-3"
        style="max-width: 540px;margin: auto;"
      >
        <div class="row no-gutters">
          <div class="col-md-4">
            <a href="#">
              <img
                class="card-img"
                :src="restaurant.image | emptyImage"
              >
            </a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                {{ restaurant.name }}
              </h5>
              <span class="badge badge-secondary">收藏數：{{ restaurant.favoriteCount }}</span>
              <p class="card-text">
                {{ restaurant.description }}
              </p>
              <router-link
                :to="{name: 'restaurant', params: {id: restaurant.id}}"
                class="btn btn-primary mr-2"
              >
                Show
              </router-link>

              <button
                v-if="restaurant.isFavorited"
                type="button"
                class="btn btn-danger mr-2"
                @click.stop.prevent="removeFavorite(restaurant.id)"
              >
                移除最愛
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click.stop.prevent="addFavorite(restaurant.id)"
              >
                加到最愛
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import Spinner from './../components/Spinner.vue'
import { emptyImageFilter } from './../utils/mixin'
import restaurantAPI from './../apis/restaurants'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helper'

export default {
  components: {
    NavTabs: NavTabs,
    Spinner: Spinner
  },
  mixins: [emptyImageFilter],
  data () {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  created () {
    this.fetchTopRestaurants()
  },
  methods: {
    async fetchTopRestaurants () {
      try {
        this.isLoading = true
        const response = await restaurantAPI.getTopRestaurants()
        this.restaurants = response.data.restaurants.map(restaurant => ({
          id: restaurant.id,
          image: restaurant.image,
          name: restaurant.name,
          favoriteCount: restaurant.FavoriteCount,
          isFavorited: restaurant.isFavorited
        }))
        this.isLoading = false
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料尚未讀取成功，請稍候再試'
        })
        this.isLoading = false
      }
    },
    async addFavorite (restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurants = this.restaurants.map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          } else {
            return {
              ...restaurant,
              isFavorited: true,
              favoriteCount: restaurant.favoriteCount + 1
            }
          }
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '加入最愛失敗，請稍候再試'
        })
      }
    },
    async removeFavorite (restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurants = this.restaurants.map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          } else {
            return {
              ...restaurant,
              isFavorited: false,
              favoriteCount: restaurant.favoriteCount - 1
            }
          }
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '取消最愛失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
