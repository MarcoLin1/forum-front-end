<template>
  <div class="container py-5">
    <UserProfileEditForm
      :initial-profile="profile"
    />
  </div>
</template>

<script>
import UserProfileEditForm from './../components/UserProfileEditForm.vue'
import { mapState } from 'vuex'

export default {
  components: {
    UserProfileEditForm: UserProfileEditForm
  },
  data () {
    return {
      profile: {}
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    // 因為currentUser透過非同步取得，所以一有變更就再呼叫一次setUser
    currentUser (user) {
      const { id } = this.$route.params
      this.setUser(id)
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  methods: {
    setUser (id) {
      const { profile } = this.currentUser
      // 如果currentUser id 和路由的id不同，就轉址到404
      if (profile.id !== id) {
        this.$route.push({ name: 'not-found' })
        return
      }
      this.profile = {
        ...this.profile,
        id: profile.id,
        name: profile.name,
        email: profile.email,
        isAdmin: profile.isAdmin,
        image: profile.image
      }
    }
  }
}
</script>
