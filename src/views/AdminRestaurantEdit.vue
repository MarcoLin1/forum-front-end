<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helper'

export default {
  name: 'AdminRestaurantEdit',
  components: {
    AdminRestaurantForm: AdminRestaurantForm
  },
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
        categoryId: ''
      },
      isProcessing: false
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 在只改變路由的情況，再呼叫fetchRestaurant抓取要去的餐廳資料
    this.fetchRestaurant(to.params.id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        console.log(data)
        const { id, name, tel, address, opening_hours: openingHours, description, image, CategoryId: categoryId } = data.restaurant
        this.restaurant = {
          ...this.restaurant,
          id: id,
          name: name,
          tel: tel,
          address: address,
          openingHours: openingHours,
          description: description,
          image: image,
          categoryId: categoryId
        }
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({ restaurantId: this.restaurant.id, formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'admin-restaurants' })
      } catch (e) {
        this.isProcessing = false
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '餐廳資料修改失敗，請稍候再試'
        })
      }
      // for (const [name, value] of formData.entries()) {
      //   console.log(name + ':' + value)
      // }
    }
  }
}
</script>
