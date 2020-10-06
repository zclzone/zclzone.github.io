<template>
  <app-header></app-header>
  <app-main></app-main>
  <footer></footer>
</template>

<script>
import AppHeader from '@/layout/header/index'
import AppMain from '@/layout/main/index'
import AppFooter from '@/layout/footer/index'
export default {
  name: 'Home',
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  },
}
</script>
