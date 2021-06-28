<template>
  <div class="container py-5">
    <NavTabs />

    <!-- 餐廳類別標籤 RestaurantNavPills -->
    <RestaurantsNavPills
      :categories="categories"
    />

    <div class="row">
      <!-- 餐廳卡片 -->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 -->
    <RestaurantPagination
      :current-page="currentPage"
      :total-page="totalPage"
      :previous-page="previousPage"
      :next-page="nextPage"
      :category-id="categoryId"
    />
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import RestaurantCard from './../components/RestaurantCard.vue'
import RestaurantsNavPills from './../components/RestaurantsNavPills.vue'
import RestaurantPagination from './../components/RestaurantPagination.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helper'

export default {
  components: {
    NavTabs: NavTabs,
    RestaurantCard: RestaurantCard,
    RestaurantsNavPills: RestaurantsNavPills,
    RestaurantPagination: RestaurantPagination
  },
  data () {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1

    }
  },
  created () {
    // 取得動態路由，使用者直接輸入網址也可取得對應的資料
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId
    })
  },
  // 當網址改變時觸發
  // to: 接下來要前往的路由, from: 來自哪個路由, next: 繼續往下執行
  beforeRouteUpdate (to, from, next) {
    // 給page and categoryId預設值為空字串，因為當沒有該page or categoryId時會是undefined
    const { page = '', categoryId = '' } = to.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    next()
  },
  methods: {
    async fetchRestaurants ({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId
        })
        // 解構賦值，將api回傳的資料放入data中
        const { restaurants, categories, categoryId, page, totalPage, prev, next } = response.data
        this.restaurants = restaurants
        this.categories = categories
        this.categoryId = categoryId
        this.currentPage = page
        this.totalPage = totalPage
        this.previousPage = prev
        this.nextPage = next
      } catch (e) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍候再試'
        })
        console.log(e)
      }
    }
  }
}
</script>
