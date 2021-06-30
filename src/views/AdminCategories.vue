<template>
  <div class="container py-5">
    <!--  AdminNav -->
    <AdminNav />
    <form
      class="my-4"
    >
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
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            >
            <span
              v-show="category.isEditing"
              class="cancel"
              @click.stop.prevent="handleCancel(category.id)"
            >X
            </span>
            <div
              v-show="!category.isEditing"
              class="category-name"
            >
              {{ category.name }}
            </div>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="updateCategory({categoryId: category.id, name: category.name})"
            >
              Save
            </button>
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
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
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helper'

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
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get()
        this.categories = data.categories.map(category => {
          return {
            ...category,
            isEditing: false,
            nameCached: ''
          }
        })
        console.log(this.categories)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '餐廳類別資料讀取失敗，請稍候再試'
        })
      }
    },
    async createCategory () {
      try {
        const { data } = await adminAPI.categories.create({ name: this.categoryName })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.categories.push({
          id: data.categoryId,
          name: this.categoryName
        })
        this.categoryName = ''
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '新增餐廳類別失敗'
        })
      }
    },
    async deleteCategory (categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({ categoryId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 將該餐廳類別從陣列中刪除
        this.categories = this.categories.filter(category => category.id !== categoryId)
      } catch (e) {
        console.log(e)
        Toast.fire({
          icon: 'error',
          title: '刪除失敗，請稍候再試'
        })
      }
    },
    toggleIsEditing (categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            // 切換isEditing狀態
            isEditing: !category.isEditing,
            // 複製一份原本的category name
            nameCached: category.name
          }
        }
        return category
      })
    },
    updateCategory ({ categoryId, name }) {
      // Todo: 透過api向伺服器要求更新餐廳類別

      // 切換isEditing狀態
      this.toggleIsEditing(categoryId)
    },
    handleCancel (categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            // 將category name換回一開始暫存的nameCached
            name: category.nameCached
          }
        }
        return category
      })
      this.toggleIsEditing(categoryId)
    }
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>
