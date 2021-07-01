import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  create ({ text, restaurantId }) {
    return apiHelper.post('/comments', { text, restaurantId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  delete ({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
