<template>
  <div class="container py-5">
    <form
      class="w-100"
      @submit.stop.prevent="handleSubmit"
    >
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        >
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        {{ isProcessing ? 'Wait': 'Submit' }}
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">
            Sign In
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helper'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        // 判斷註冊資料是否填寫
        if (!this.email || !this.name || !this.password || !this.passwordCheck) {
          Toast.fire({
            icon: 'error',
            title: '請確實填入註冊資料'
          })
          return
        }
        // 判斷密碼輸入是否正確
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: 'error',
            title: '密碼與確認密碼不符，請重新輸入'
          })
          return
        }
        // 將註冊資料透過api送給伺服器
        this.isProcessing = true
        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })

        if (data.status !== 'success') {
          this.isProcessing = false
          throw new Error(data.message)
        }
        // 轉址到登入頁
        this.$router.push({ name: 'sign-in' })
      } catch (e) {
        this.isProcessing = false
        console.log(e)
        Toast.fire({
          icon: 'warning',
          title: '無法註冊'
        })
      }
    }
  }
}
</script>
