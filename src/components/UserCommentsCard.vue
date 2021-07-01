<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ comments.length }}</strong>
      " 已評論餐廳 "
    </div>
    <div class="card-body">
      <router-link
        v-for="comment in comments"
        :key="comment.id"
        :to="{name: 'restaurant', params: {id: comment.id}}"
      >
        <img
          :src="comment.Restaurant.image | emptyImage"
          alt=""
          style="width:60px;height:60px;"
          class="avatar mr-2"
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
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>
