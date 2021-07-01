<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          :src="personalProfile.image | emptyImage"
          alt=""
          style="width:300px; height:300px;"
        >
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ personalProfile.name }}
          </h5>
          <p class="card-text">
            {{ personalProfile.email }}
          </p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ personalProfile.commentLength }}</strong>
              " 已評論過餐廳"
            </li>
            <li>
              <strong>{{ personalProfile.favoriteRestaurantLength }}</strong>
              " 收藏的餐廳"
            </li>
            <li>
              <strong>{{ personalProfile.followingLength }}</strong>
              "  followings (追蹤者)"
            </li>
            <li>
              <strong>{{ personalProfile.followerLength }}</strong>
              "  followers (追隨者)"
            </li>
          </ul>
          <template>
            <router-link
              v-if="isCurrentUser"
              :to="{name: 'user-profile-edit', params: {id: personalProfile.id}}"
            >
              <button
                type="submit"
                class="btn btn-primary"
              >
                edit
              </button>
            </router-link>
            <template v-else>
              <button
                v-if="!isFollowed"
                type="submit"
                class="btn btn-info"
                @click.stop.prevent="addFollowing(personalProfile.id)"
              >
                追蹤
              </button>
              <button
                v-else
                type="submit"
                class="btn btn-danger"
                @click.stop.prevent="deleteFollowing(personalProfile.id)"
              >
                取消追蹤
              </button>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixin'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
export default {
  name: 'UserProfileCard',
  mixins: [emptyImageFilter],
  props: {
    userProfile: {
      type: [Array, Object],
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    },
    isCurrentUser: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      personalProfile: this.userProfile,
      isFollowed: this.initialIsFollowed
    }
  },
  watch: {
    userProfile (newValue) {
      this.personalProfile = {
        ...this.personalProfile,
        ...newValue
      }
    },
    initialIsFollowed (newValue) {
      this.isFollowed = newValue
    }
  },
  methods: {
    async addFollowing (userId) {
      try {
        const { data } = await userAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isFollowed = true
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '新增追蹤失敗，請稍候再試'
        })
      }
    },
    async deleteFollowing (userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isFollowed = false
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '取消追蹤失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
