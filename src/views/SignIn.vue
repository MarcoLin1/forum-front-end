<template>
  <div class="container py-5">
    <form
      class="w-100"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
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
          autocomplete="current-password"
          required
        >
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">
            Sign Up
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
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        // 如果email or password 未輸入,就發出提醒並return
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入email和password'
          })
          return
        }
        // 當都有填，將button轉成disabled，避免重複點擊
        this.isProcessing = true

        // 透過authorizationAPI中的signIn取得輸入的email和password，然後送request給伺服器
        const userData = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        // 將取得的資料中的token存入localStorage中，最後再redirect到restaurants首頁
        const { data } = userData
        localStorage.setItem('token', data.token)
        this.$router.push('/restaurants')
      } catch (e) {
        // 當錯誤時，將password欄位清空，並將button的disabled取消
        // 並用toast提醒錯誤原因
        this.password = ''
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: '請確認email或password'
        })
        console.log(e)
      }
    }
  }
}
</script>
