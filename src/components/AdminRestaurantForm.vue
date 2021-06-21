<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      >
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        id="categoryId"
        v-model="restaurant.categoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option
          value=""
          selected
          disabled
        >
          --請選擇--
        </option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      >
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      >
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      >
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
        width="200"
        height="200"
        class="d-block img-thumbnail mb-3"
      >
      <label for="image">Image</label>
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      >
    </div>

    <button
      type="submit"
      class="btn btn-primary"
    >
      送出
    </button>
  </form>
</template>

<script>
const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 5,
      name: '素食料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 6,
      name: '美式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 7,
      name: '複合式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 11,
      name: '咒靈料理',
      createdAt: '2021-05-30T07:40:35.000Z',
      updatedAt: '2021-05-30T07:40:35.000Z'
    }
  ]
}
export default {
  name: 'AdminRestaurantForm',
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: ''
      })
    }
  },
  data () {
    return {
      categories: [],
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: ''
      }
    }
  },
  created () {
    this.fetchRestaurant()
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant
    }
  },
  methods: {
    fetchRestaurant () {
      this.categories = dummyData.categories
    },
    handleFileChange (e) {
      const files = e.target.files
      // 因為只存一個檔案，所以長度是1，若是0的話代表沒有上傳
      if (files.length === 0) {
        this.restaurant.image = ''
      } else {
        // 為本機檔案產生暫存的URL
        const imageURL = window.URL.createObjectURL(files[0])
        this.restaurant.image = imageURL
      }
    },
    handleSubmit (e) {
      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  }
}
</script>
