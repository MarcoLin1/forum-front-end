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
    >
      Submit
    </button>
  </form>
</template>

<script>
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
      }
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
    // form轉成formData，準備傳送到後端or向父層傳送
    handleSubmit (e) {
      const form = e.target
      const formData = new FormData(form)
      for (const [name, value] of formData.entries()) {
        console.log(name + ':' + value)
      }
    }
  }
}
</script>
