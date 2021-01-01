<template>
  <app-header></app-header>
  <app-main></app-main>
  <app-footer></app-footer>
</template>

<script>
import { getAccessToken, getOauthUrl, getUserInfo } from '@/utils/oauth-util'
import { getToken, setToken } from '@/utils/cookie-util'

import AppHeader from '@/layout/header/index'
import AppMain from '@/layout/main/index'
import AppFooter from '@/layout/footer/index'
export default {
  name: 'Home',
  async beforeRouteEnter(to, from, next) {
    if (to.query && to.query.code) {
      if (getToken()) {
        next()
        return
      }
      try {
        const access_token = await getAccessToken(to.query.code)
        await getUserInfo(access_token)
        delete to.query.code
        if (access_token) {
          setToken(access_token)
          next({ ...to })
          return
        }
      } catch {
        window.name = location.href
        location.href = getOauthUrl()
      }
    }
    next()
  },
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  },
}
</script>
