<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1>餐廳描述頁</h1>
      <!-- 餐廳資訊頁 RestaurantDetail -->
      <RestaurantDetail :initial-restaurant="restaurant" />
      <hr>
      <!-- 餐廳評論 RestaurantComments -->
      <RestaurantComments
        :restaurant-comments="restaurantComments"
        @after-delete-comment="afterDeleteComment"
      />
      <!-- 新增評論 CreateComment -->
      <CreateComment
        :restaurant-id="restaurant.id"
        @after-create-comment="afterCreateComment"
      />
    </template>
  </div>
</template>

<script>
import RestaurantDetail from './../components/RestaurantDetail.vue'
import RestaurantComments from './../components/RestaurantComments.vue'
import CreateComment from './../components/CreateComment.vue'
import Spinner from './../components/Spinner.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'

export default {
  name: 'Restaurant',
  components: {
    RestaurantDetail: RestaurantDetail,
    RestaurantComments: RestaurantComments,
    CreateComment: CreateComment,
    Spinner: Spinner
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
      isLoading: true
    }
  },
  // 取得vuex中currentUser的資料
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  created () {
    // 透過解構賦值方式解開外層的大括號
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        this.isLoading = true
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })
        const { restaurant, isFavorited, isLiked } = data
        const { id, name, tel, address, opening_hours: openingHours, description, image, Category } = restaurant
        this.restaurant = {
          id: id,
          name: name,
          tel: tel,
          address: address,
          openingHours: openingHours,
          description: description,
          image: image,
          categoryName: Category.name ? Category.name : '未分類',
          isFavorited: isFavorited,
          isLiked: isLiked
        }
        this.restaurantComments = data.restaurant.Comments
        this.isLoading = false
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '餐廳資料讀取失敗，請稍候再試'
        })
        this.isLoading = false
      }
    },
    afterDeleteComment (commentId) {
      console.log('afterDeleteComment', commentId)
      // 以filter保留未被選擇的comment
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
    },
    afterCreateComment (payload) {
      const { commentId, text, restaurantId } = payload
      this.restaurantComments.push({
        id: commentId,
        text: text,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        createdAt: new Date()
      })
    }
  }
}
</script>
