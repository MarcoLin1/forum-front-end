<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followers.length }}</strong>
      " followers(追隨者)"
    </div>
    <div class="card-body">
      <router-link
        v-for="follower in followers"
        :key="follower.id"
        :to="{name: 'user-profile', params: {id: follower.id}}"
      >
        <img
          :src="follower.image | emptyImage"
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
  }
}
</script>
