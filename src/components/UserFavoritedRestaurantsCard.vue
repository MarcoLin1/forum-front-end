<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ favoritedRestaurants.length }}</strong>
      " 收藏的餐廳"
    </div>
    <div class="card-body">
      <router-link
        v-for="favoriteRestaurant in favoritedRestaurants"
        :key="favoriteRestaurant.id"
        :to="{name: 'restaurant', params: {id: favoriteRestaurant.id}}"
      >
        <img
          :src="favoriteRestaurant.image | emptyImage"
          alt=""
          style="width:60px; height:60px;"
          class="mr-2"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixin'
export default {
  mixins: [emptyImageFilter],
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true
    }
  }
}
</script>
