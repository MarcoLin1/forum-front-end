<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div
      v-for="comment in restaurantComments"
      :key="comment.id"
    >
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{name: 'user-profile', params: {id: comment.id}}">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>
// 利用mixin將小工具打包，再各別引入
import { fromNowFilter } from '../utils/mixin'
const dummyUser = {
  currentUser: {
    id: 1,
    name: 'root',
    email: 'root@example.com',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentUser: dummyUser.currentUser
    }
  },
  methods: {
    handleDeleteButtonClick (commentId) {
      console.log('handleDeleteButtonClick', commentId)

      // 請求api伺服器刪除id為commentId的評論
      // 觸發父層事件 - $emit('事件名稱', 傳遞的資料)
      this.$emit('after-delete-comment', commentId)
    }
  }
}
</script>
