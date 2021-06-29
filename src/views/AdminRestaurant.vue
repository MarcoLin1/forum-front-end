<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        >
        <div class="well">
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
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr>
    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixin'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helper'

export default {
  name: 'AdminRestaurant',
  mixins: [emptyImageFilter],
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: '',
        categoryName: ''
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  created (restaurantId) {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        const { id, name, tel, address, opening_hours: openingHours, description, image, Category } = data.restaurant
        this.restaurant = {
          id: id,
          name: name,
          tel: tel,
          address: address,
          openingHours: openingHours,
          description: description,
          image: image,
          categoryName: Category.name ? Category.name : '未分類'
        }
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '讀取餐廳資料失敗，請稍候再試'
        })
      }
      // const { id, name, tel, address, opening_hours: openingHours, description, image, Category } = restaurant
      // this.restaurant = {
      //   id: id,
      //   name: name,
      //   tel: tel,
      //   address: address,
      //   openingHours: openingHours,
      //   description: description,
      //   image: image,
      //   categoryName: Category.name ? Category.name : '未分類'
      // }
    }
  }
}
</script>
