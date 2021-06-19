<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        v-model="text"
        class="form-control"
        rows="3"
        name="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >
        回上一頁
      </button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    handleSubmit () {
      // Todo 透過api向伺服器請求一筆comment
      // commentID
      this.$emit('after-create-comment', {
        commentId: uuidv4(), // 尚未串接api，無法取得commentId，暫時用隨機的id
        text: this.text,
        restaurantId: this.restaurantId
      })
      // 將表單內容清空
      this.text = ''
    }
  }
}
</script>
