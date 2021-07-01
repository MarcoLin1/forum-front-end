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
import { mapState } from 'vuex'
import { Toast } from './../utils/helper'
import commentAPI from './../apis/comments'

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  // 取得vuex中currentUser的資料
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async handleDeleteButtonClick (commentId) {
      try {
        // 請求api伺服器刪除id為commentId的評論
        const { data } = await commentAPI.delete({ commentId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 觸發父層事件 - $emit('事件名稱', 傳遞的資料)
        this.$emit('after-delete-comment', commentId)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '刪除失敗'
        })
      }
    }
  }
}
</script>
