<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        >
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{ restaurant.openingHours }}
            </li>
            <li>
              <strong>Tel:</strong>
              {{ restaurant.tel }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ restaurant.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr>
    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixin'
const dummyData = {
  restaurant: {
    id: 2,
    name: 'Mrs. Mckenzie Johnston',
    tel: '567-714-6131 x621',
    address: '61371 Rosalinda Knoll',
    opening_hours: '08:00',
    description:
      'Quia pariatur perferendis architecto tenetur omnis pariatur tempore.',
    image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=2',
    createdAt: '2019-06-22T09:00:43.000Z',
    updatedAt: '2019-06-22T09:00:43.000Z',
    CategoryId: 3,
    Category: {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  }
}
export default {
  name: 'AdminRestaurant',
  mixins: [emptyImageFilter],
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: '',
        categoryName: ''
      }
    }
  },
  created () {
    this.fetchRestaurant()
  },
  methods: {
    fetchRestaurant () {
      const { restaurant } = dummyData
      const { id, name, tel, address, opening_hours: openingHours, description, image, Category } = restaurant
      this.restaurant = {
        id: id,
        name: name,
        tel: tel,
        address: address,
        openingHours: openingHours,
        description: description,
        image: image,
        categoryName: Category.name ? Category.name : '未分類'
      }
    }
  }
}
</script>
