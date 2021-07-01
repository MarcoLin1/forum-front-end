<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="profile.name"
        type="text"
        name="name"
        class="form-control"
        placeholder="Enter Name"
        required
      >
    </div>

    <div class="form-group">
      <img
        v-if="profile.image"
        :src="profile.image"
        alt=""
        width="200"
        height="200"
        class="d-block img-thumbnail"
      >
      <label for="image">Image</label>
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      >
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >
      {{ isProcessing ? '處理中': 'Submit' }}
    </button>
  </form>
</template>

<script>
import userAPI from './../apis/users'
import { Toast } from './../utils/helper'
export default {
  props: {
    initialProfile: {
      type: Object,
      default: () => ({
        name: '',
        image: '',
        email: '',
        isAdmin: ''
      })
    }
  },
  data () {
    return {
      profile: {
        id: -1,
        name: '',
        image: '',
        email: '',
        isAdmin: ''
      },
      isProcessing: false
    }
  },
  created () {
    this.profile = {
      ...this.profile,
      ...this.initialProfile
    }
  },
  methods: {
    // 上傳檔案預覽圖
    handleFileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.profile.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.profile.image = imageURL
      }
    },
    async handleSubmit (e) {
      try {
        // 避免姓名欄位空白
        if (!this.profile.name) {
          Toast.fire({
            icon: 'error',
            title: '請輸入姓名'
          })
          return
        }

        this.isProcessing = true

        // form轉成formData，傳送到後端
        const form = e.target
        const formData = new FormData(form)
        const { data } = await userAPI.update({ userId: this.profile.id, formData })

        // 如果沒有更新成功就拋出error，否則轉址到個人頁
        if (data.status !== 'success') {
          throw new Error(data.message)
        } else {
          this.$router.push({ name: 'user-profile' })
        }
      } catch (e) {
        this.isProcessing = false
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '送出失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
