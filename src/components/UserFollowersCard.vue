<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ follower.length }}</strong>
      " followers(追隨者)"
    </div>
    <div class="card-body">
      <a
        v-for="follow in follower"
        :key="follow.id"
        href=""
      >
        <img
          :src="follow.image"
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
    followers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      follower: this.followers
    }
  }
}
</script>
