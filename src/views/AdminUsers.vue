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
            <!-- <button
              v-show="!user.isAdmin"
              type="button"
              class="btn btn-link"
              style="font-size: 0.95rem;"
              @click.stop.prevent="handleUserRole(user.id)"
            >
              set as admin
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav.vue'
const dummyData = {
  users: [
    {
      id: 1,
      name: 'root',
      email: 'root@example.com',
      password: '$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG',
      isAdmin: true,
      image: 'https://i.imgur.com/eVfTIsY.jpg',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-29T16:22:50.000Z'
    },
    {
      id: 2,
      name: 'Fushiguro Megumi',
      email: 'user1@example.com',
      password: '$2a$10$A0B7wDm/3dqFAxjH45sXW.2ASFMgKVGKU3DH6O5VpnGSG3Bd6Y9kq',
      isAdmin: false,
      image: 'https://i.imgur.com/hSgGs9O.jpg',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-29T16:25:56.000Z'
    },
    {
      id: 3,
      name: 'Kugisaki Nobara',
      email: 'user2@example.com',
      password: '$2a$10$b7E1.cVoAcrTFooTp4tx4eFnxUxKizT8mVr26QYJGuhp4YbRnjB02',
      isAdmin: false,
      image: 'https://i.imgur.com/es1gVME.jpeg',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-29T16:29:30.000Z'
    },
    {
      id: 11,
      name: 'Itadori Yuji',
      email: 'Da@example.com',
      password: '$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K',
      isAdmin: false,
      image: 'https://i.imgur.com/pIHFJtM.png',
      createdAt: '2021-05-29T07:38:44.000Z',
      updatedAt: '2021-05-29T16:30:20.000Z'
    },
    {
      id: 21,
      name: 'aa',
      email: 'anafalcao@poli.ufrj.br',
      password: '$2a$10$CTNyFwrQg4ldpZBvEaYArOOe4XTPgR2OY6Hp7ocF1318zvZ9Ne.Py',
      isAdmin: false,
      image: null,
      createdAt: '2021-06-11T11:47:29.000Z',
      updatedAt: '2021-06-11T11:47:29.000Z'
    },
    {
      id: 31,
      name: '12',
      email: '123@123',
      password: '$2a$10$P4OM.30O29Gnh3D3fh0d2eD53LCDBO.24hurukOU/sRqgmJAS53TG',
      isAdmin: false,
      image: null,
      createdAt: '2021-06-17T07:15:33.000Z',
      updatedAt: '2021-06-17T07:15:33.000Z'
    },
    {
      id: 41,
      name: 'dan',
      email: 'sss@gmail,com',
      password: '$2a$10$Y0CtfnZzxCUDjvudBFFRbu3kBLQ/zFuaMp5dBTvGKfQh94ga5OkU2',
      isAdmin: false,
      image: null,
      createdAt: '2021-06-18T14:27:37.000Z',
      updatedAt: '2021-06-18T14:27:37.000Z'
    }
  ]
}
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
      },
      currentUser: {
        id: -1,
        name: '',
        email: '',
        isAdmin: ''
      }
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.users = dummyData.users
      this.currentUser = dummyData.users[0]
    },
    handleUserRole ({ userId, isAdmin }) {
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin
          }
        }
        return user
      })
    }
  }
}
</script>
