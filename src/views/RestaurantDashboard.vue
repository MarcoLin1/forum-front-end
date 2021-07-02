<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div>
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>

      <hr>

      <ul>
        <li>評論數： {{ restaurant.commentsLength }} </li>
        <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
      </ul>

      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >
        回上一頁
      </button>
    </template>
  </div>
</template>

<script>
import Spinner from './../components/Spinner.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helper'

export default {
  name: 'RestaurantDashboard',
  components: {
    Spinner: Spinner
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        text: '',
        categoryName: '',
        commentsLength: 0,
        viewCounts: 0
      },
      isLoading: true
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        this.isLoading = true
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })
        const { id, name, text, Category, Comments, viewCounts } = data.restaurant
        this.restaurant = {
          ...this.restaurant,
          id: id,
          name: name,
          text: text,
          categoryName: Category ? Category.name : '未分類',
          commentsLength: Comments.length,
          viewCounts: viewCounts
        }
        this.isLoading = false
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
        this.isLoading = false
      }
    }
  }
}
</script>
