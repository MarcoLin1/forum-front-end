import { apiHelper } from '../utils/helper'

export default {
  getRestaurants ({ page, categoryId }) {
    // 透過URLSearchParams取得不同的query string
    const searchParams = new URLSearchParams({ page: page, categoryId: categoryId })

    // 呼叫apiHelper發送帶有query string的request，並且帶入已取得的token
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getFeeds () {
    return apiHelper.get('/restaurants/feeds')
  },
  getTopRestaurants () {
    return apiHelper.get('/restaurants/top')
  },
  getRestaurant ({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  }
}
