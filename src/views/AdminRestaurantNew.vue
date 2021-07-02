<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 餐廳表單 AdminRestaurantForm -->
      <AdminRestaurantForm
        :is-processing="isProcessing"
        @after-submit="handleAfterSubmit"
      />
    </template>
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import Spinner from './../components/Spinner.vue'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helper'
export default {
  components: {
    AdminRestaurantForm: AdminRestaurantForm,
    Spinner: Spinner
  },
  data () {
    return {
      isProcessing: false,
      isLoading: false
    }
  },
  methods: {
    async handleAfterSubmit (formData) {
      try {
        this.isLoading = true
        this.isProcessing = true
        // 透過restaurants.create方法向伺服器建立餐廳
        const { data } = await adminAPI.restaurants.create({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 成功的話，轉址到/admin/restaurants
        this.$router.push({ name: 'admin-restaurants' })
        this.isLoading = false
      } catch (e) {
        this.isProcessing = false
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳，請稍後再試'
        })
        this.isLoading = false
      }
    }
  }
}
</script>
