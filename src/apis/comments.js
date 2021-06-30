import { apiHelper } from '../utils/helper'
const getToken = () => localStorage.getItem('token')

export default {
  create ({ comment, restaurantId }) {
    return apiHelper.post('/comments', { comment, restaurantId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
