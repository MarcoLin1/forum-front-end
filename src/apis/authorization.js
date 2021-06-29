import { apiHelper } from './../utils/helper'

export default {
  signIn ({ email, password }) {
    return apiHelper.post('/signin', {
      email: email,
      password: password
    })
  },
  signUp ({ name, email, password, passwordCheck }) {
    return apiHelper.post('/signup', {
      name: name,
      email: email,
      password: password,
      passwordCheck: passwordCheck
    })
  }
}
