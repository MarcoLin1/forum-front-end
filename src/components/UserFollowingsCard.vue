<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ following.length }}</strong>
      " following(追蹤者)"
    </div>
    <div class="card-body">
      <router-link
        v-for="follow in following"
        :key="follow.id"
        :to="{name: 'user-profile', params: {id: follow.id}}"
      >
        <img
          :src="follow.image"
          alt=""
          style="width:60px; height:60px;"
          class="avatar mr-2"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    followings: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      following: this.followings
    }
  }
}
</script>
