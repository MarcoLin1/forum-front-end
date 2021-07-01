<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image | emptyImage"
        style="width: 250px;margin-bottom: 25px;"
      >
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <!-- <p>{{ restaurant.description }}</p> -->
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{name: 'restaurant-dashboard', params: {id: restaurant.id}}"
      >
        Dashboard
      </router-link>

      <button
        v-if="restaurant.isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click.stop.prevent="removeFavorite"
      >
        移除最愛
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.stop.prevent="addFavorite(restaurant.id)"
      >
        加到最愛
      </button>
      <button
        v-if="restaurant.isLiked"
        type="button"
        class="btn btn-danger like mr-2"
        @click.stop.prevent="removeLike(restaurant.id)"
      >
        Unlike
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary like mr-2"
        @click.stop.prevent="addLike(restaurant.id)"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixin'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
export default {
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      restaurant: this.initialRestaurant
    }
  },
  // 監控資料，當有變化就隨時更新，若未設定一開始會抓取到data預設值
  watch: {
    initialRestaurant (newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  methods: {
    async addLike (restaurantId) {
      try {
        const { data } = await userAPI.addLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '點擊Like失敗，請稍候再試'
        })
      }
    },
    async removeLike (restaurantId) {
      try {
        const { data } = await userAPI.deleteLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '取消Like失敗，請稍候再試'
        })
      }
    },
    async addFavorite (restaurantId) {
      try {
        const { data } = await userAPI.addFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        }
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '加入最愛失敗，請稍候再試'
        })
      }
    },
    removeFavorite () {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false
      }
    }
  }
}
</script>
