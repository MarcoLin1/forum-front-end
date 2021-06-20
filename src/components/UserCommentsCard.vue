<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ allComments.length }}</strong>
      " 已評論餐廳 "
    </div>
    <div class="card-body">
      <router-link
        v-for="comment in allComments"
        :key="comment.id"
        :to="{name: 'restaurant', params: {id: comment.id}}"
      >
        <img
          :src="comment.Restaurant.image"
          alt=""
          style="width:60px;height:60px;"
          class="avatar mr-2"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allComments: this.comments
    }
  }
}
</script>
