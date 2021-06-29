<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th
          scope="col"
          width="300"
        >
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{name: 'admin-restaurant', params: {id: restaurant.id}}"
            class="btn btn-link"
          >
            Show
          </router-link>

          <router-link
            :to="{name: 'admin-restaurant-edit', params: {id: restaurant.id}}"
            class="btn btn-link"
          >
            Edit
          </router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helper'

export default {
  data () {
    return {
      restaurants: []
    }
  },
  created () {
    this.fetchRstaurants()
  },
  methods: {
    async fetchRstaurants () {
      try {
        const { data } = await adminAPI.restaurants.get()
        console.log(data)
        this.restaurants = data.restaurants
      } catch (e) {
        console.log(e)
        Toast.fore({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
    },
    async deleteRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.delete({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '刪除失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
