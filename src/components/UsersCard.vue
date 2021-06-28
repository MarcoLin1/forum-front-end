<template>
  <div class="row text-center">
    <div
      v-for="user in users"
      :key="user.id"
      class="col-3"
    >
      <a href="#">
        <img
          :src="user.image | emptyImage"
          width="140px"
          height="140px"
        >
      </a>
      <h2>{{ user.name }}</h2>
      <span class="badge badge-secondary">追蹤人數：{{ user.followerCount }}</span>
      <p class="mt-3">
        <button
          v-if="user.isFollowed"
          type="button"
          class="btn btn-danger"
          @click.stop.prevent="deleteFollowing(user.id)"
        >
          取消追蹤
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary"
          @click.stop.prevent="addFollowing(user.id)"
        >
          追蹤
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixin'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
export default {
  mixins: [emptyImageFilter],
  data () {
    return {
      users: []
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    async fetchUser () {
      try {
        const { data } = await userAPI.getTopUsers()
        this.users = data.users.map(user => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed
        }))
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '讀取失敗，請稍候再試'
        })
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await userAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.users = this.users.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true
            }
          }
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '追蹤失敗，請稍後再試'
        })
      }
    },
    async deleteFollowing (userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false
            }
          }
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '取消追蹤失敗，請稍後再試'
        })
      }
    }
  }
}
</script>
