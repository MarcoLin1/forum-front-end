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
import commentAPI from './../apis/comments'
import { Toast } from './../utils/helper'

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
    async handleSubmit () {
      try {
        const { data } = await commentAPI.create({ text: this.text, restaurantId: this.restaurantId })
        console.log(data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        //
        this.$emit('after-create-comment', {
          commentId: data.commentId,
          text: this.text,
          restaurantId: this.restaurantId
        })

        // 將表單內容清空
        this.text = ''
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '新增評論失敗，請稍候再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>
