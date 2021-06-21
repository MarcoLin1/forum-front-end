<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th
          scope="col"
          width="300"
        >
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{name: 'admin-restaurant', params: {id: restaurant.id}}"
            class="btn btn-link"
          >
            Show
          </router-link>

          <router-link
            :to="{name: 'admin-restaurant-edit', params: {id: restaurant.id}}"
            class="btn btn-link"
          >
            Edit
          </router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const dummyData = {
  restaurants: [
    {
      id: 1,
      name: 'Keely BogisichDa',
      tel: '119.568.4472 x714',
      address: '9991 Dorothy Canyon',
      opening_hours: '08:00',
      description: 'Beatae et sit aut velit sed minus esse est est. Cupiditate quod ut impedit ipsa repudiandae dicta blanditiis dignissimos consequuntur. Illum minima explicabo animi nostrum recusandae voluptatum fugit. Sunt impedit praesentium atque. Itaque doloribus minima provident unde odit quod iste et.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435',
      viewCounts: 29,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-20T12:11:59.000Z',
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
      viewCounts: 12,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-18T12:37:33.000Z',
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
      viewCounts: 7,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-20T12:11:01.000Z',
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
      viewCounts: 8,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-20T12:11:30.000Z',
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
    },
    {
      id: 10,
      name: 'Austin Ratke',
      tel: '381-750-6862',
      address: '65970 Trantow Shore',
      opening_hours: '08:00',
      description: 'Necessitatibus facilis et facilis maxime dolor qui.\nUnde incidunt tenetur harum error modi.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=47.899630473012444',
      viewCounts: 3,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-30T03:47:05.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
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
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 12,
      name: 'Fernando Hayes',
      tel: '(405) 253-6001 x2415',
      address: '43820 Wunsch Islands',
      opening_hours: '08:00',
      description: 'praesentium nihil aut',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=23.143193409221684',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
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
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 14,
      name: 'Sallie Bogan',
      tel: '1-759-709-0979 x265',
      address: '6573 Jaskolski Fords',
      opening_hours: '08:00',
      description: 'Delectus doloremque ullam nesciunt. Ea quisquam nobis quasi. Ut quia impedit fuga quisquam quia laborum. Rerum doloremque aut quis sint in non qui. Omnis porro hic.\n \rSunt ut aliquid ipsum corrupti sint doloremque. Et molestiae dolor quod. Molestiae ut reiciendis hic et. Vitae vitae consequuntur rerum. Pariatur tenetur soluta repellat aut vero qui esse.\n \rQuis velit pariatur. Ut eum sed commodi rerum excepturi maiores rem sit aut. Illo laboriosam laborum. Iusto ipsa aspernatur qui. Dolorem autem vel optio reprehenderit facilis voluptatibus. Qui magni rerum.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=32.84844935581652',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 15,
      name: 'Yadira Prohaska',
      tel: '1-347-390-1996',
      address: '60365 Funk Squares',
      opening_hours: '08:00',
      description: 'Mollitia dolor molestiae ea. Aspernatur sint dignissimos qui ipsa. Porro sit soluta dignissimos placeat. Eius dolore ex consequatur cumque. Saepe illo quia eveniet sed. Vero doloribus voluptatem enim sequi quia non reiciendis.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=94.40706825623026',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 16,
      name: 'Preston Terry',
      tel: '690-158-9300',
      address: '9410 McKenzie Spur',
      opening_hours: '08:00',
      description: 'unde',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=72.83894629155955',
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
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
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
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 19,
      name: 'Jocelyn Schmeler',
      tel: '191.390.3339 x38458',
      address: '93275 Crooks Ports',
      opening_hours: '08:00',
      description: 'Nostrum ut assumenda qui praesentium vero itaque tempore cumque. Vitae voluptates voluptas doloribus minima et enim alias odio odit. Sit sint suscipit consectetur.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=50.25480575800692',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 20,
      name: 'Orville Kirlin',
      tel: '291.325.4600',
      address: '14019 Raul Hollow',
      opening_hours: '08:00',
      description: 'autem mollitia et',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=94.78870207327962',
      viewCounts: 2,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-15T03:11:49.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 21,
      name: 'Eric Ankunding Sr.',
      tel: '1-115-638-0782 x114',
      address: '98145 Newell Meadows',
      opening_hours: '08:00',
      description: 'Consectetur quia at praesentium fuga. Vel perferendis aut tempora nihil soluta aut voluptas recusandae. Enim ipsum alias accusamus labore nam eveniet. Voluptas consequatur est consectetur rem aperiam sit laborum dolores dolores. Numquam inventore est ex aspernatur in deleniti atque odio.\n \rEst praesentium id iste non incidunt. Voluptates aspernatur omnis quae magnam quam et sapiente provident. Porro et dolorem esse sunt.\n \rSapiente beatae numquam dolores. Autem necessitatibus qui minima dolorem ut quod nesciunt ex. Nihil ex omnis ut consequatur et porro incidunt ex explicabo. Similique qui dolorum hic ut ipsa aut doloremque itaque. Maxime blanditiis alias ipsa fugit omnis sunt qui culpa eos. Atque libero quae iure architecto corporis quia rerum quas.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=51.042601640539864',
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
      id: 22,
      name: 'Gino Goodwin',
      tel: '761-210-0609 x9554',
      address: '480 Kihn Cliff',
      opening_hours: '08:00',
      description: 'reprehenderit',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=56.74370993226279',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 23,
      name: 'Jerry Wisoky Jr.',
      tel: '(292) 278-7011 x37942',
      address: '265 Ike Mount',
      opening_hours: '08:00',
      description: 'Porro id sed architecto voluptatem odio culpa molestiae id.\nAssumenda autem tenetur qui non expedita voluptatem et corrupti sit.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=95.38642802546475',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 24,
      name: 'Ludwig Pouros',
      tel: '(170) 707-5090 x0867',
      address: '518 Greenholt Viaduct',
      opening_hours: '08:00',
      description: 'Nihil voluptate aut. Molestias voluptatibus reprehenderit ex quisquam. Enim ad doloribus. Voluptas a dolorem omnis sint. Maiores quia dolor ea.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=64.05875201807739',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 25,
      name: 'Alaina Graham',
      tel: '246-341-5275 x9966',
      address: '59159 Luettgen Stravenue',
      opening_hours: '08:00',
      description: 'Vitae occaecati consequatur quam omnis quis. Laborum est ullam corporis fuga tempora. Laudantium dicta quis voluptatem reprehenderit eos libero vero. Vel dolorem ullam aut iure qui ab quis consectetur. Rerum perspiciatis illo.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=6.262011046505567',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 26,
      name: 'Pansy Bahringer',
      tel: '305-389-4179',
      address: '954 Willms Stravenue',
      opening_hours: '08:00',
      description: 'Enim consectetur quasi dolores. Repellat minus sint omnis reprehenderit. Voluptas repellendus aut voluptas iusto similique omnis. Eligendi quis laboriosam adipisci rerum nemo saepe odio harum quia.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=14.666378775084677',
      viewCounts: 1,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-20T12:11:14.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 27,
      name: 'Forest Bradtke',
      tel: '1-143-940-1327 x30947',
      address: '8449 Kessler Union',
      opening_hours: '08:00',
      description: 'Repudiandae voluptates voluptatibus. Hic sit eum excepturi. Recusandae odit voluptatem doloribus illum id rerum. Voluptate nihil asperiores. Et sint quasi ut minus possimus dolor est illo. Quibusdam rerum qui voluptas possimus optio ab sit aut et.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=66.92696260309216',
      viewCounts: 1,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-20T12:11:06.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 28,
      name: 'Rupert Funk',
      tel: '1-912-257-4926 x148',
      address: '01847 Lubowitz Curve',
      opening_hours: '08:00',
      description: 'Sit odit tempore.\nQuisquam facere aperiam corrupti libero et ut.\nQuidem quidem corporis officiis quidem commodi aliquam fuga adipisci.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=75.17214091328148',
      viewCounts: 1,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-20T12:11:24.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 29,
      name: 'Mrs. Collin Carroll',
      tel: '657-166-3656',
      address: '89858 Rogahn Parkway',
      opening_hours: '08:00',
      description: 'sit',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=67.73711641187701',
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
      id: 30,
      name: 'Wyatt Maggio',
      tel: '076-093-9479',
      address: '8628 Botsford Garden',
      opening_hours: '08:00',
      description: 'Voluptatem voluptatem illum quod dolorem alias repellendus modi dolores. Non qui voluptas sunt praesentium. Eligendi expedita quae. Provident sed aut nam eos dignissimos.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=62.31411189273619',
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
      id: 31,
      name: 'Chadrick Dickens',
      tel: '1-050-475-7015',
      address: '590 Paul Wells',
      opening_hours: '08:00',
      description: 'amet',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=55.720348665264005',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 32,
      name: 'Pedro Carter',
      tel: '1-851-583-9952',
      address: '10168 Freda Village',
      opening_hours: '08:00',
      description: 'enim fuga harum',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=70.15679994507582',
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
      id: 33,
      name: "Vincenza O'Conner",
      tel: '677-713-2840 x888',
      address: '983 Stracke Port',
      opening_hours: '08:00',
      description: 'Placeat tempore error minima voluptatibus qui velit ea iste. Quam omnis ex est quo. Vel ea esse ut consequatur voluptas incidunt veritatis vitae esse. Rerum tempora dolorum sed maxime ullam. Delectus assumenda accusantium harum enim in id. Sint tempora similique et modi sunt vero.\n \rExpedita quia minus nisi. Vel velit sint saepe eos veritatis quos illum iure minima. Et et corrupti qui eligendi repudiandae similique.\n \rSed vero doloremque recusandae et nulla aliquam explicabo. Esse omnis cumque non nemo expedita in. Provident tenetur rerum. Quod in aut nam autem.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=28.94183492360749',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 34,
      name: 'Christina Wilderman',
      tel: '994-533-6732 x683',
      address: '781 Manuel Corner',
      opening_hours: '08:00',
      description: 'corrupti',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=17.92886995776586',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 35,
      name: 'Germaine McLaughlin',
      tel: '1-767-887-3980',
      address: '1623 Aurelio Lakes',
      opening_hours: '08:00',
      description: 'Ut et accusamus qui. Deleniti expedita voluptates quam.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=17.244411817820172',
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
      id: 36,
      name: 'Santos Boyer',
      tel: '1-717-120-7465 x8700',
      address: '672 Ward Crest',
      opening_hours: '08:00',
      description: 'Et totam et dignissimos est consequatur tenetur. Molestiae tempora aut. Nostrum aliquid qui voluptas. Voluptatem et repudiandae quibusdam excepturi magni illo inventore. Illo veritatis occaecati. Adipisci vero maxime tempore.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=70.76118223213477',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 37,
      name: 'Ms. Lesley VonRueden',
      tel: '1-970-570-3548 x164',
      address: '12326 Adolphus Ways',
      opening_hours: '08:00',
      description: 'Iste rerum inventore accusantium odio dolor sunt repellendus mollitia saepe.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=35.528833224491784',
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
      id: 38,
      name: 'Queen Wiegand',
      tel: '1-359-797-5101',
      address: '08540 Bednar Mill',
      opening_hours: '08:00',
      description: 'perspiciatis natus qui',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=81.97931058441159',
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
      id: 39,
      name: 'Francisco Welch',
      tel: '559-037-3903 x264',
      address: '8551 Milford Manor',
      opening_hours: '08:00',
      description: 'cupiditate minima voluptatibus',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=63.78881920944735',
      viewCounts: 1,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-06-20T12:11:08.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 40,
      name: 'Wilton Hilpert',
      tel: '1-803-846-7997',
      address: '9399 Smitham Parkways',
      opening_hours: '08:00',
      description: 'Ut assumenda provident reiciendis rem libero ut earum. Quasi saepe vel consectetur ea similique veniam. Culpa debitis autem. Harum qui velit sequi aut. Dolorum quia molestiae facilis eveniet vero cum. Veritatis voluptatem cum harum ipsum unde.\n \rLaudantium dignissimos amet. Voluptatem doloremque natus et a vitae culpa et quaerat sed. Nihil illo porro velit similique qui saepe error aut. Fugiat quod non consequatur omnis expedita quod. Sit in aliquam iure placeat et ut laudantium illum.\n \rEx harum explicabo quia nobis. Quod nesciunt omnis inventore qui unde. Itaque mollitia alias eius hic voluptates non. Reiciendis nostrum qui. Aut autem quo doloremque ab et vitae voluptas.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=98.16410047400868',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 41,
      name: 'Merlin Bednar',
      tel: '501.423.3243 x38704',
      address: '9885 Chelsie Rest',
      opening_hours: '08:00',
      description: 'vel',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=65.36671251477443',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 42,
      name: 'Miguel Reynolds',
      tel: '1-947-459-1991',
      address: '1805 Boehm Pines',
      opening_hours: '08:00',
      description: 'repellat',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=15.744870749346273',
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
      id: 43,
      name: 'Miss Carmella Mante',
      tel: '1-833-230-1926 x2337',
      address: '3055 Evangeline Spur',
      opening_hours: '08:00',
      description: 'accusantium',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=55.099475925744535',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 44,
      name: 'Kaia Bechtelar',
      tel: '053-919-6662 x16712',
      address: '6966 Barney Shoals',
      opening_hours: '08:00',
      description: 'Expedita praesentium facere qui error commodi architecto molestias. Magni quia libero aut et.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=98.72311605088555',
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
      id: 45,
      name: 'Ian Legros',
      tel: '(557) 337-1678 x1901',
      address: '80387 Sipes Drives',
      opening_hours: '08:00',
      description: 'Cupiditate expedita aut dolor consequatur magni amet veniam et optio.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=89.96703304988323',
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
      id: 46,
      name: 'Peyton Kris',
      tel: '(791) 475-7815 x090',
      address: '571 Herzog Fort',
      opening_hours: '08:00',
      description: 'consectetur cupiditate corporis',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=73.88235510224528',
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
      id: 47,
      name: 'Damon Hills',
      tel: '263.655.4368 x2431',
      address: '315 Dexter Trail',
      opening_hours: '08:00',
      description: 'Quo quos quibusdam est earum.\nOdio et provident praesentium in aut.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=83.04917751090251',
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
      id: 48,
      name: 'Dr. Angelita Cassin',
      tel: '(934) 446-1520 x790',
      address: '6463 Dach Parkway',
      opening_hours: '08:00',
      description: 'A perferendis doloremque quae alias officiis ea. Exercitationem animi molestias enim repudiandae facere voluptate dolore sunt eligendi. Itaque aliquam voluptatem commodi dolorem fugiat ut minima in consectetur. Facere aspernatur consequatur nam ipsum aliquam et quidem quis nihil.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=57.07047964964713',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
    {
      id: 49,
      name: 'Nicklaus Brown',
      tel: '699.468.6852 x46694',
      address: '677 Kub Junction',
      opening_hours: '08:00',
      description: 'Adipisci deleniti voluptatibus ut incidunt quod consequatur non nihil. Officiis exercitationem omnis tenetur quaerat placeat molestiae. Quam consequuntur sed unde ad voluptas odit quos. Quisquam rerum quos est et consequuntur.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=32.163308489265475',
      viewCounts: 0,
      createdAt: '2021-05-17T05:11:05.000Z',
      updatedAt: '2021-05-17T05:11:05.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2021-05-17T05:11:05.000Z',
        updatedAt: '2021-05-17T05:11:05.000Z'
      }
    },
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
    }
  ]
}

export default {
  data () {
    return {
      restaurants: dummyData.restaurants
    }
  },
  methods: {
    deleteRestaurant (restaurantId) {
      this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)
    }
  }
}
</script>
