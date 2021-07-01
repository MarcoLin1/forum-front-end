<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followings.length }}</strong>
      " following(追蹤者)"
    </div>
    <div class="card-body">
      <router-link
        v-for="following in followings"
        :key="following.id"
        :to="{name: 'user-profile', params: {id: following.id}}"
      >
        <img
          :src="following.image | emptyImage"
          alt=""
          style="width:60px; height:60px;"
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
    followings: {
      type: Array,
      required: true
    }
  }
}
</script>
