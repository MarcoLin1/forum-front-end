<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <!-- UserProfileCard -->
      <UserProfileCard
        :user-profile="userProfile"
        :initial-is-followed="isFollowed"
        :is-current-user="currentUser.id === userProfile.id"
      />

      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard -->
          <UserFollowingsCard :followings="followings" />
          <br>
          <!-- UserFollowersCard -->
          <UserFollowersCard :followers="followers" />
        </div>
        <div class="col-md-8">
          <!-- UserCommentsCard -->
          <UserCommentsCard :comments="comments" />

          <!-- UserFavoritedRestaurantsCard -->
          <UserFavoritedRestaurantsCard :favorited-restaurants="favoritedRestaurants" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from './../components/UserProfileCard.vue'
import UserFollowingsCard from './../components/UserFollowingsCard.vue'
import UserFollowersCard from './../components/UserFollowersCard.vue'
import UserCommentsCard from './../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from './../components/UserFavoritedRestaurantsCard.vue'
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'

export default {
  components: {
    UserProfileCard: UserProfileCard,
    UserFollowingsCard: UserFollowingsCard,
    UserFollowersCard: UserFollowersCard,
    UserCommentsCard: UserCommentsCard,
    UserFavoritedRestaurantsCard: UserFavoritedRestaurantsCard
  },
  data () {
    return {
      userProfile: {
        id: '',
        name: '',
        email: '',
        commentLength: '',
        favoriteRestaurantLength: '',
        followingLength: '',
        followerLength: ''
      },
      comments: [],
      favoritedRestaurants: [],
      followers: [],
      followings: [],
      isFollowed: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
    console.log(id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await userAPI.get({ userId })
        console.log(data)
        const { id, name, email, Comments, FavoritedRestaurants, Followers, Followings } = data.profile
        this.userProfile = {
          id,
          name,
          email,
          commentLength: Comments.length,
          favoriteRestaurantLength: FavoritedRestaurants.length,
          followingLength: Followings.length,
          followerLength: Followers.length
        }
        this.comments = Comments
        this.favoritedRestaurants = FavoritedRestaurants
        this.followers = Followers
        this.followings = Followings
        this.isFollowed = data.isFollowed
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗'
        })
      }
    }
  }
}
</script>
