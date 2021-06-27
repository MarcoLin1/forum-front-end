import { apiHelper } from './../utils/helper'

export default {
  signIn ({ email, password }) {
    return apiHelper.post('/signin', {
      email: email,
      password: password
    })
  }
}
