<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ follower.length }}</strong>
      " followers(追隨者)"
    </div>
    <div class="card-body">
      <router-link
        v-for="follow in follower"
        :key="follow.id"
        :to="{name: 'user-profile', params: {id: follow.id}}"
      >
        <img
          :src="follow.image | emptyImage"
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
