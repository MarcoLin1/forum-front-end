<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <UsersCard />
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import UsersCard from './../components/UsersCard.vue'

export default {
  components: {
    NavTabs: NavTabs,
    UsersCard: UsersCard
  }
}
</script>
