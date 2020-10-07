<template>
  <main>
    <clock />
    <search />
    <favorites />
  </main>
</template>

<script>
import Clock from '@/components/clock'
import Search from './search'
import Favorites from './favorites/index'
export default {
  components: {
    Clock,
    Search,
    Favorites,
  },
}
</script>