import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 如同component裡的data，且每個vue都可以直接使用
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  // 設定函式，用來修改state裡的資料
  mutations: {

    // 參數state: 帶入store裡的state
    // 參數currentUser: 接收從component傳入的資料
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,

        // 將api取得的currentUser覆蓋掉原本state裡的currentUser
        ...currentUser
      }

      // 將使用者驗證用的token存在state中
      state.token = localStorage.getItem('token')

      // 修改登入狀態為true
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false

      // 登出後清空存在state中的token
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // 設定其他非同步函式，例如發送api請求
  actions: {
    // 帶入commit來取得使用commit這個方法呼叫mutation的函式
    async fetchCurrentUser ({ commit }) {
      try {
        // 呼叫userAPI叫出資料
        const { data } = await userAPI.getCurrentUser()
        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', {
          id: id,
          name: name,
          email: email,
          image: image,
          isAdmin: isAdmin
        })
        // 成功之後回傳true，用於驗證登入權限
        return true
      } catch (e) {
        console.log(e)
        console.error('Can not fetch user information')

        // 驗證失敗一併觸發登出行為，清除state中的token
        commit('revokeAuthentication')
        // 失敗的話回傳false，用於驗證登入權限
        return false
      }
    }
  },
  // 當state過於龐大時，用來拆檔的
  modules: {
  }
})
