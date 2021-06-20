<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ allComments.length }}</strong>
      " 已評論餐廳 "
    </div>
    <div class="card-body">
      <a
        v-for="comment in allComments"
        :key="comment.id"
        href=""
      >
        <img
          :src="comment.Restaurant.image"
          alt=""
          style="width:60px;height:60px;"
        >
      </a>
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
