<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? 'admin': 'user' }}</td>
          <td>
            <button
              v-if="currentUser.id !== user.id"
              type="button"
              class="btn btn-link"
              style="font-size: 0.95rem;"
              @click.stop.prevent="handleUserRole({userId: user.id, isAdmin: user.isAdmin})"
            >
              {{ user.isAdmin ? 'set as user': 'set as admin' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav.vue'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helper'
import { mapState } from 'vuex'

export default {
  components: {
    AdminNav: AdminNav
  },
  data () {
    return {
      users: {
        id: -1,
        name: '',
        email: '',
        isAdmin: ''
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.fetchUser()
  },
  methods: {
    async fetchUser () {
      try {
        const { data } = await adminAPI.users.get()
        this.users = data.users
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '資料讀取失敗，請稍候再試'
        })
      }
    },
    async handleUserRole ({ userId, isAdmin }) {
      try {
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: (!isAdmin).toString()
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !user.isAdmin
            }
          }
          return user
        })
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '更新失敗，請稍候再試'
        })
      }
    }
  }
}
</script>
