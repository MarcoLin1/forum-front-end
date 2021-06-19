<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      最新動態
    </h1>
    <hr>
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <h3>最新評論</h3>
        <!-- 最新評論 NewestComments -->
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import NewestRestaurants from './../components/NewesrRestaurants.vue'
import NewestComments from './../components/NewestComments.vue'

const dummyData = {
  restaurants: [
    {
      id: 51,
      name: '麥當勞',
      tel: '123',
      address: '694 Schroeder Spurs',
      opening_hours: '21:10',
      description: '555555555',
      image: 'https://i.imgur.com/0A5og2G.jpg',
      viewCounts: 0,
      createdAt: '2021-05-29T12:09:30.000Z',
      updatedAt: '2021-05-29T12:15:26.000Z',
      CategoryId: 6,
      Category: {
        id: 6,
        name: '美式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 1,
      name: 'Keely BogisichDa',
      tel: '119.568.4472 x714',
      address: '9991 Dorothy Canyon',
      opening_hours: '08:00',
      description: 'Beatae et sit aut velit sed minus esse est est. Cupiditate quod ut impedit ipsa repudiandae dicta blanditiis dignissimos consequuntur. Illum minima explicabo animi nostrum recusandae voluptatum fugit. Sunt impedit praesentium atque. Itaque doloribus minima provident unde odit quod iste et.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435',
      viewCounts: 21,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-15T03:12:11.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 2,
      name: 'Alexandrine McKenzie DVM',
      tel: '(266) 656-0345 x270',
      address: '0142 Smith Gateway',
      opening_hours: '08:00',
      description: 'voluptas',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=7.1615087469963035',
      viewCounts: 11,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-31T11:22:40.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 3,
      name: 'Aglae Gulgowski',
      tel: '114.568.9420 x031',
      address: '43362 Noel Turnpike',
      opening_hours: '08:00',
      description: 'At commodi ut veritatis et velit est quis. Ut laudantium laudantium exercitationem ipsam molestiae corporis quasi maxime sequi. Possimus et perspiciatis qui et vel quod. Veniam totam asperiores fuga error rerum sit quasi. Architecto debitis rem minus dolore.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=79.91299846538044',
      viewCounts: 5,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-31T11:23:34.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 4,
      name: 'Vicenta Terry',
      tel: '(044) 422-4145 x30459',
      address: '19271 Ziemann Cape',
      opening_hours: '08:00',
      description: 'Quia autem adipisci et rerum officia earum quidem dignissimos.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=69.23537063310978',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 5,
      name: 'Isabelle Emmerich',
      tel: '642.420.1404 x4385',
      address: '34249 Volkman Grove',
      opening_hours: '08:00',
      description: 'non ea illo',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=36.36127013737524',
      viewCounts: 6,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-17T07:16:14.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 6,
      name: 'Miss Darrel Funk',
      tel: '1-174-686-9086 x8073',
      address: '11507 Weimann Place',
      opening_hours: '08:00',
      description: 'Veniam omnis in iste perferendis quod quia tempora.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=84.47709833016874',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 7,
      name: 'Frederic Grant',
      tel: '1-249-944-2682 x0629',
      address: '13538 Michel Rapid',
      opening_hours: '08:00',
      description: 'Neque sunt et quia est.\nNatus nihil consequatur similique fuga illum.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=7.4017327223739215',
      viewCounts: 5,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-28T16:24:40.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 8,
      name: 'Dr. Ansley Johnston',
      tel: '294-480-0575',
      address: '1071 Idell Gardens',
      opening_hours: '08:00',
      description: 'eum',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=81.1442811444988',
      viewCounts: 4,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-28T16:30:48.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 9,
      name: 'Cecile Schaden',
      tel: '1-132-261-4174',
      address: '768 Boyle Canyon',
      opening_hours: '08:00',
      description: 'Et distinctio commodi reprehenderit omnis. Maxime dolorem qui laboriosam impedit qui reiciendis adipisci modi iure. Recusandae quam nulla sequi fuga quo dolor saepe vitae dolor. Vel aut perferendis sed dolorem. Iste non consequuntur quos ut autem doloremque voluptatem.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=39.152519630246154',
      viewCounts: 2,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-28T16:31:23.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    }
  ],
  comments: [
    {
      id: 161,
      text: 'Go eating\n',
      UserId: 11,
      RestaurantId: 2,
      createdAt: '2021-05-31T11:22:15.000Z',
      updatedAt: '2021-05-31T11:22:15.000Z',
      User: {
        id: 11,
        name: 'Itadori Yuji',
        email: 'Da@example.com',
        password: '$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K',
        isAdmin: false,
        image: 'https://i.imgur.com/pIHFJtM.png',
        createdAt: '2021-05-29T07:38:44.000Z',
        updatedAt: '2021-05-29T16:30:20.000Z'
      },
      Restaurant: {
        id: 2,
        name: 'Alexandrine McKenzie DVM',
        tel: '(266) 656-0345 x270',
        address: '0142 Smith Gateway',
        opening_hours: '08:00',
        description: 'voluptas',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=7.1615087469963035',
        viewCounts: 11,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-31T11:22:40.000Z',
        CategoryId: 5
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
      },
      Restaurant: {
        id: 1,
        name: 'Keely BogisichDa',
        tel: '119.568.4472 x714',
        address: '9991 Dorothy Canyon',
        opening_hours: '08:00',
        description: 'Beatae et sit aut velit sed minus esse est est. Cupiditate quod ut impedit ipsa repudiandae dicta blanditiis dignissimos consequuntur. Illum minima explicabo animi nostrum recusandae voluptatum fugit. Sunt impedit praesentium atque. Itaque doloribus minima provident unde odit quod iste et.',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435',
        viewCounts: 21,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-06-15T03:12:11.000Z',
        CategoryId: 1
      }
    },
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
      },
      Restaurant: {
        id: 1,
        name: 'Keely BogisichDa',
        tel: '119.568.4472 x714',
        address: '9991 Dorothy Canyon',
        opening_hours: '08:00',
        description: 'Beatae et sit aut velit sed minus esse est est. Cupiditate quod ut impedit ipsa repudiandae dicta blanditiis dignissimos consequuntur. Illum minima explicabo animi nostrum recusandae voluptatum fugit. Sunt impedit praesentium atque. Itaque doloribus minima provident unde odit quod iste et.',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435',
        viewCounts: 21,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-06-15T03:12:11.000Z',
        CategoryId: 1
      }
    },
    {
      id: 2,
      text: 'Et aut voluptate explicabo architecto libero non deserunt qui.',
      UserId: 1,
      RestaurantId: 2,
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
      },
      Restaurant: {
        id: 2,
        name: 'Alexandrine McKenzie DVM',
        tel: '(266) 656-0345 x270',
        address: '0142 Smith Gateway',
        opening_hours: '08:00',
        description: 'voluptas',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=7.1615087469963035',
        viewCounts: 11,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-31T11:22:40.000Z',
        CategoryId: 5
      }
    },
    {
      id: 3,
      text: 'Perspiciatis fugit est dolores blanditiis adipisci sit nihil.',
      UserId: 1,
      RestaurantId: 3,
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
      },
      Restaurant: {
        id: 3,
        name: 'Aglae Gulgowski',
        tel: '114.568.9420 x031',
        address: '43362 Noel Turnpike',
        opening_hours: '08:00',
        description: 'At commodi ut veritatis et velit est quis. Ut laudantium laudantium exercitationem ipsam molestiae corporis quasi maxime sequi. Possimus et perspiciatis qui et vel quod. Veniam totam asperiores fuga error rerum sit quasi. Architecto debitis rem minus dolore.',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=79.91299846538044',
        viewCounts: 5,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-31T11:23:34.000Z',
        CategoryId: 4
      }
    },
    {
      id: 7,
      text: 'Consectetur voluptatibus assumenda commodi amet molestiae eveniet.',
      UserId: 1,
      RestaurantId: 7,
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
      },
      Restaurant: {
        id: 7,
        name: 'Frederic Grant',
        tel: '1-249-944-2682 x0629',
        address: '13538 Michel Rapid',
        opening_hours: '08:00',
        description: 'Neque sunt et quia est.\nNatus nihil consequatur similique fuga illum.',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=7.4017327223739215',
        viewCounts: 5,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-28T16:24:40.000Z',
        CategoryId: 3
      }
    },
    {
      id: 11,
      text: 'Voluptatibus sunt porro quo aperiam et earum vel.',
      UserId: 1,
      RestaurantId: 11,
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
      },
      Restaurant: {
        id: 11,
        name: 'Verona Grady',
        tel: '(482) 132-8200 x10167',
        address: '9635 Malinda Ranch',
        opening_hours: '08:00',
        description: 'Sit sed occaecati vel.',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=14.504936560833315',
        viewCounts: 6,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-28T16:44:25.000Z',
        CategoryId: 5
      }
    },
    {
      id: 13,
      text: 'Quae alias numquam amet dolores.',
      UserId: 1,
      RestaurantId: 13,
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
      },
      Restaurant: {
        id: 13,
        name: 'Erna Cassin PhD',
        tel: '642-685-6113',
        address: '902 Maegan Inlet',
        opening_hours: '08:00',
        description: 'tenetur rerum magnam',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=75.12026971384928',
        viewCounts: 0,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z',
        CategoryId: 1
      }
    },
    {
      id: 17,
      text: 'Voluptatem eligendi dolorem eaque incidunt.',
      UserId: 1,
      RestaurantId: 17,
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
      },
      Restaurant: {
        id: 17,
        name: 'Katrina Cole',
        tel: '1-371-311-9102 x334',
        address: '6713 Considine Falls',
        opening_hours: '08:00',
        description: 'est',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=15.98745500777856',
        viewCounts: 0,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z',
        CategoryId: 4
      }
    },
    {
      id: 18,
      text: 'Accusamus aut id blanditiis voluptas ratione temporibus.',
      UserId: 1,
      RestaurantId: 18,
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
      },
      Restaurant: {
        id: 18,
        name: 'Juliana Rowe',
        tel: '540.926.8892',
        address: '0308 Maximillia Highway',
        opening_hours: '08:00',
        description: 'Deserunt eos velit vel corporis ut ut similique quasi atque.',
        image: 'https://loremflickr.com/320/240/restaurant,food/?random=70.98988728179461',
        viewCounts: 0,
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z',
        CategoryId: 3
      }
    }
  ]
}
export default {
  components: {
    NavTabs: NavTabs,
    NewestRestaurants: NewestRestaurants,
    NewestComments: NewestComments
  },
  data () {
    return {
      restaurants: [],
      comments: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.restaurants = dummyData.restaurants
      this.comments = dummyData.comments.filter(comment => comment.Restaurant && comment.text)
    }
  }
}
</script>
