<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          :src="userProfile.image"
          alt=""
          style="width:300px; height:300px;"
        >
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ userProfile.name }}
          </h5>
          <p class="card-text">
            {{ userProfile.email }}
          </p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ userProfile.Comments.length }}</strong>
              " 已評論過餐廳"
            </li>
            <li>
              <strong>{{ userProfile.FavoritedRestaurants.length }}</strong>
              " 收藏的餐廳"
            </li>
            <li>
              <strong>{{ userProfile.Followings.length }}</strong>
              "  followings (追蹤者)"
            </li>
            <li>
              <strong>{{ userProfile.Followers.length }}</strong>
              "  followers (追隨者)"
            </li>
          </ul>
          <template>
            <a
              v-if="userProfile.isAdmin"
              href=""
            >
              <button
                type="submit"
                class="btn btn-primary"
              >edit</button>
            </a>
            <template v-else>
              <button
                v-if="isFollowed"
                type="submit"
                class="btn btn-info"
                @click.prevent="addFollowing"
              >
                追蹤
              </button>
              <button
                v-else
                type="submit"
                class="btn btn-danger"
                @click="deleteFollowing"
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
export default {
  name: 'UserProfileCard',
  props: {
    userProfile: {
      type: Object,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isFollowed: this.initialIsFollowed
    }
  },
  methods: {
    addFollowing () {
      this.isFollowed = false
    },
    deleteFollowing () {
      this.isFollowed = true
    }
  }
}
</script>
