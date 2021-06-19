<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from './../components/RestaurantDetail.vue'
import RestaurantComments from './../components/RestaurantComments.vue'
import CreateComment from './../components/CreateComment.vue'

const dummyData = {
  restaurant: {
    id: 1,
    name: 'Keely BogisichDa',
    tel: '119.568.4472 x714',
    address: '9991 Dorothy Canyon',
    opening_hours: '08:00',
    description: 'Beatae et sit aut velit sed minus esse est est. Cupiditate quod ut impedit ipsa repudiandae dicta blanditiis dignissimos consequuntur. Illum minima explicabo animi nostrum recusandae voluptatum fugit. Sunt impedit praesentium atque. Itaque doloribus minima provident unde odit quod iste et.',
    image: 'https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435',
    viewCounts: 23,
    createdAt: '2021-05-17T05:11:05.000Z',
    updatedAt: '2021-06-18T13:34:52.972Z',
    CategoryId: 1,
    Category: {
      id: 1,
      name: '中式料理',
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z'
    },
    FavoritedUsers: [
      {
        id: 11,
        name: 'Itadori Yuji',
        email: 'Da@example.com',
        password: '$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K',
        isAdmin: false,
        image: 'https://i.imgur.com/pIHFJtM.png',
        createdAt: '2021-05-29T07:38:44.000Z',
        updatedAt: '2021-05-29T16:30:20.000Z',
        Favorite: {
          UserId: 11,
          RestaurantId: 1,
          createdAt: '2021-05-30T07:56:47.000Z',
          updatedAt: '2021-05-30T07:56:47.000Z'
        }
      }
    ],
    LikedUsers: [
      {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password: '$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG',
        isAdmin: true,
        image: 'https://i.imgur.com/eVfTIsY.jpg',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-29T16:22:50.000Z',
        Like: {
          UserId: 1,
          RestaurantId: 1,
          createdAt: '2021-05-22T01:39:33.000Z',
          updatedAt: '2021-05-22T01:39:33.000Z'
        }
      },
      {
        id: 11,
        name: 'Itadori Yuji',
        email: 'Da@example.com',
        password: '$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K',
        isAdmin: false,
        image: 'https://i.imgur.com/pIHFJtM.png',
        createdAt: '2021-05-29T07:38:44.000Z',
        updatedAt: '2021-05-29T16:30:20.000Z',
        Like: {
          UserId: 11,
          RestaurantId: 1,
          createdAt: '2021-05-30T07:57:04.000Z',
          updatedAt: '2021-05-30T07:57:04.000Z'
        }
      },
      {
        id: 31,
        name: '12',
        email: '123@123',
        password: '$2a$10$P4OM.30O29Gnh3D3fh0d2eD53LCDBO.24hurukOU/sRqgmJAS53TG',
        isAdmin: false,
        image: null,
        createdAt: '2021-06-17T07:15:33.000Z',
        updatedAt: '2021-06-17T07:15:33.000Z',
        Like: {
          UserId: 31,
          RestaurantId: 1,
          createdAt: '2021-06-17T07:15:55.000Z',
          updatedAt: '2021-06-17T07:15:55.000Z'
        }
      }
    ],
    Comments: [
      {
        id: 1,
        text: 'Ex dolorem molestiae id sint.',
        UserId: 1,
        RestaurantId: 1,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z',
        User: {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG',
          isAdmin: true,
          image: 'https://i.imgur.com/eVfTIsY.jpg',
          createdAt: '2021-05-17T05:11:05.000Z',
          updatedAt: '2021-05-29T16:22:50.000Z'
        }
      },
      {
        id: 51,
        text: 'Exercitationem quis sunt quae repellendus.',
        UserId: 2,
        RestaurantId: 1,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z',
        User: {
          id: 2,
          name: 'Fushiguro Megumi',
          email: 'user1@example.com',
          password: '$2a$10$A0B7wDm/3dqFAxjH45sXW.2ASFMgKVGKU3DH6O5VpnGSG3Bd6Y9kq',
          isAdmin: false,
          image: 'https://i.imgur.com/hSgGs9O.jpg',
          createdAt: '2021-05-17T05:11:05.000Z',
          updatedAt: '2021-05-29T16:25:56.000Z'
        }
      },
      {
        id: 101,
        text: 'Eligendi et ut magni occaecati ipsum.',
        UserId: 1,
        RestaurantId: 1,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z',
        User: {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG',
          isAdmin: true,
          image: 'https://i.imgur.com/eVfTIsY.jpg',
          createdAt: '2021-05-17T05:11:05.000Z',
          updatedAt: '2021-05-29T16:22:50.000Z'
        }
      },
      {
        id: 151,
        text: 'Exercitationem quis sunt quae repellendus.\nEligendi et ut magni occaecati ipsum.',
        UserId: 11,
        RestaurantId: 1,
        createdAt: '2021-05-29T07:47:43.000Z',
        updatedAt: '2021-05-29T07:47:43.000Z',
        User: {
          id: 11,
          name: 'Itadori Yuji',
          email: 'Da@example.com',
          password: '$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K',
          isAdmin: false,
          image: 'https://i.imgur.com/pIHFJtM.png',
          createdAt: '2021-05-29T07:38:44.000Z',
          updatedAt: '2021-05-29T16:30:20.000Z'
        }
      }
    ]
  },
  isFavorited: false,
  isLiked: true
}
const dummyUser = {
  currentUser: {
    id: 1,
    name: 'root',
    email: 'root@example.com',
    image: 'https://i.imgur.com/eVfTIsY.jpg',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  name: 'Restaurant',
  components: {
    RestaurantDetail: RestaurantDetail,
    RestaurantComments: RestaurantComments,
    CreateComment: CreateComment
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
      currentUser: dummyUser.currentUser
    }
  },
  created () {
    // 透過解構賦值方式解開外層的大括號
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  methods: {
    fetchRestaurant (restaurantId) {
      // console.log('fetchID:', restaurantId)
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        openingHours: dummyData.restaurant.opening_hours,
        description: dummyData.restaurant.description,
        image: dummyData.restaurant.image,
        categoryName: dummyData.restaurant.Category.name,
        isFavorited: dummyData.isFavorited,
        isLiked: dummyData.isLiked
      }
      this.restaurantComments = dummyData.restaurant.Comments
    },
    afterDeleteComment (commentId) {
      console.log('afterDeleteComment', commentId)
      // 以filter保留未被選擇的comment
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
    },
    afterCreateComment (payload) {
      const { commentId, text, restaurantId } = payload
      this.restaurantComments.push({
        id: commentId,
        text: text,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        createdAt: new Date()
      })
    }
  }
}
</script>
