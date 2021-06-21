<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'

const dummyData = {
  restaurant: {
    id: 1,
    name: 'Keely BogisichDa',
    tel: '119.568.4472 x714',
    address: '9991 Dorothy Canyon',
    opening_hours: '08:00',
    description: 'Beatae et sit aut velit sed minus esse est est. Cupiditate quod ut impedit ipsa repudiandae dicta blanditiis dignissimos consequuntur. Illum minima explicabo animi nostrum recusandae voluptatum fugit. Sunt impedit praesentium atque. Itaque doloribus minima provident unde odit quod iste et.',
    image: 'https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435',
    viewCounts: 30,
    createdAt: '2021-05-17T05:11:05.000Z',
    updatedAt: '2021-06-20T14:23:30.000Z',
    CategoryId: 1,
    Category: {
      id: 1,
      name: '中式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    }
  }
}

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
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  methods: {
    fetchRestaurant (restaurantId) {
      console.log('fetch restaurantId:', restaurantId)
      const { restaurant } = dummyData
      this.restaurant = {
        ...this.restaurant,
        id: restaurant.id,
        name: restaurant.name,
        tel: restaurant.tel,
        address: restaurant.address,
        openingHours: restaurant.opening_hours,
        description: restaurant.description,
        image: restaurant.image,
        categoryId: restaurant.CategoryId
      }
    },
    handleAfterSubmit (formData) {
      for (const [name, value] of formData.entries()) {
        console.log(name + ':' + value)
      }
    }
  }
}
</script>
