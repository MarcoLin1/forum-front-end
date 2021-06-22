<template>
  <div class="container py-5">
    <!--  AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="categoryName"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="createCategory"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th
            scope="col"
            width="60"
          >
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th
            scope="col"
            width="210"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
        >
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div class="category-name">
              {{ category.name }}
            </div>
          </td>
          <td class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-link mr-2"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav.vue'
import { v4 as uuid } from 'uuid'
const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 5,
      name: '素食料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 6,
      name: '美式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 7,
      name: '複合式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    {
      id: 11,
      name: '咒靈料理',
      createdAt: '2021-05-30T07:40:35.000Z',
      updatedAt: '2021-05-30T07:40:35.000Z'
    }
  ]
}
export default {
  components: {
    AdminNav: AdminNav
  },
  data () {
    return {
      categories: [],
      categoryName: ''
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    fetchCategories () {
      this.categories = dummyData.categories
    },
    createCategory () {
      // Todo: 透過api告知伺服器要新增的餐廳類別...

      // 將新的類別增加到陣列中
      this.categories.push({
        id: uuid(),
        name: this.categoryName
      })
      this.categoryName = ''
    },
    deleteCategory (categoryId) {
      // Todo: 透過api告知伺服器要刪除的餐廳類別

      // 將該餐廳類別從陣列中刪除
      this.categories = this.categories.filter(category => category.id !== categoryId)
    }
  }
}
</script>
