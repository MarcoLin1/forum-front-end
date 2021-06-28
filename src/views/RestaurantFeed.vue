<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      最新動態
    </h1>
    <hr>
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <h3>最新評論</h3>
        <!-- 最新評論 NewestComments -->
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import NewestRestaurants from './../components/NewesrRestaurants.vue'
import NewestComments from './../components/NewestComments.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helper'

export default {
  components: {
    NavTabs: NavTabs,
    NewestRestaurants: NewestRestaurants,
    NewestComments: NewestComments
  },
  data () {
    return {
      restaurants: [],
      comments: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const response = await restaurantsAPI.getFeeds()
        const { restaurants, comments } = response.data
        this.restaurants = restaurants
        this.comments = comments.filter(comment => comment.Restaurant && comment.text)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
