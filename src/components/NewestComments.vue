<template>
  <div class="card">
    <div class="card-header">
      最新評論
    </div>
    <div class="card-body">
      <div
        v-for="comment in comments"
        :key="comment.id"
      >
        <h4>
          <router-link :to="{name: 'restaurant', params: {id : comment.Restaurant.id}}">
            {{ comment.text }}
          </router-link>
        </h4>
        <p>{{ comment.Restaurant.description }}</p>by
        <a href="#">
          {{ comment.User.name }}
        </a>
        at {{ comment.createdAt | fromNow }}
        <hr>
      </div>

      <!-- <div>
        <h4>
          <a href="#">
            Golden Hegmann
          </a>
        </h4>
        <p>Commodi a totam.</p>by
        <a href="#">
          user1
        </a>
        at 3 days ago
        <hr>
      </div>

      <div>
        <h4>
          <a href="#">
            Trent Hilpert
          </a>
        </h4>
        <p>Ipsa nulla qui.\nOptio labore voluptatem in quam laborum et.</p>by
        <a href="#">
          user1
        </a>
        at 3 days ago
        <hr>
      </div> -->
    </div>
  </div>
</template>

<script>
// 利用mixin將小工具打包，再各別引入
import { fromNowFilter } from '../utils/mixin'
export default {
  mixins: [fromNowFilter],
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>
