<template>
  <div class="card">
    <div class="card-header">
      最新餐廳
    </div>
    <div class="card-body">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <h4>
          <router-link :to="{name: 'restaurant', params: {id: restaurant.id}}">
            {{ restaurant.name }}
          </router-link>
          <small>{{ restaurant.Category ? restaurant.Category.name: '未分類' }}</small>
        </h4>
        <p>{{ restaurant.description }}</p>{{ restaurant.createdAt | fromNow }}
        <hr>
      </div>
      <!-- <div>
        <h4>
          <a href="#">Carter Howe</a>
          <small>日本料理</small>
        </h4>
        <p>Voluptates veritatis blanditiis ipsam. Tempora molestiae ut qui deserunt debitis sit. Impedit est rem. Blanditiis aliquid atque quo necessitatibus. Veniam sint explicabo. Est velit soluta.</p>11 days ago
        <hr>
      </div>
      <div>
        <h4>
          <a href="#">Dr. Carole Smith</a>
          <small>義大利料理</small>
        </h4>
        <p>Voluptates veritatis blanditiis ipsam. Tempora molestiae ut qui deserunt debitis sit. Impedit est rem. Blanditiis aliquid atque quo necessitatibus. Veniam sint explicabo. Est velit soluta.</p>11 days ago
        <hr>
      </div>
      <div>
        <h4>
          <a href="#">Nyah Bernier</a>
          <small>素食料理</small>
        </h4>
        <p>Voluptates veritatis blanditiis ipsam. Tempora molestiae ut qui deserunt debitis sit. Impedit est rem. Blanditiis aliquid atque quo necessitatibus. Veniam sint explicabo. Est velit soluta.</p>11 days ago
        <hr>
      </div> -->
    </div>
  </div>
</template>

<script>
// 利用mixin將小工具打包，再各別引入
import { fromNowFilter } from '../utils/mixin'

export default {
  mixins: [fromNowFilter],
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
small {
  font-size: 10px;
}
</style>
