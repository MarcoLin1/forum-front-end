<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ allFavoriteRestaurants.length }}</strong>
      " 收藏的餐廳"
    </div>
    <div class="card-body">
      <a
        v-for="favoriteRestaurant in allFavoriteRestaurants"
        :key="favoriteRestaurant.id"
        href=""
      >
        <img
          :src="favoriteRestaurant.image"
          alt=""
          style="width:60px; height:60px;"
        >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true
    }
  },
  dara () {
    return {
      allFavoriteRestaurants: []
    }
  },
  created () {
    this.fetchFavoritedRestaurants()
  },
  methods: {
    fetchFavoritedRestaurants () {
      this.allFavoriteRestaurants = this.favoritedRestaurants
    }
  }
}
</script>
