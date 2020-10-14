import { getOauthUrl } from '@/utils/oauth-util'
import { getToken, getUser } from '@/utils/cookie-util'
import { giteeApi } from '@/utils/gitee-api'

const state = () => {
  return {
    favorite: {
      seq: '',
      title: '',
      url: '',
      img: '',
    },
    currentFavo: null,
    currentFavoType: '常用收藏栏',
    showAdd: false,
    favorites: {
      '常用收藏栏': [
        {
          seq: 1,
          title: "奇思笔记",
          url: "https://qszone.com/blog",
          img: ""
        },
        {
          seq: 2,
          title: "花瓣",
          url: "https://huaban.com/",
          img: ""
        },
        {
          seq: 3,
          title: "墨刀",
          url: "https://modao.cc/dashboard/me",
          img: ""
        },
        {
          seq: 4,
          title: "Process On",
          url: "https://processon.com/diagrams",
          img: ""
        },
        {
          seq: 5,
          title: "Valine",
          url: "https://valine.js.org",
          img: ""
        }
      ]
    },
    initFavorites() {
      const localFavorites = localStorage.getItem('favorites')
      if (localFavorites) {
        this.favorites = JSON.parse(localFavorites)
      } else {
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    },
    addFavorites() {
      this.showAdd = false
      if (!this.favorite || !this.favorite.title || !this.favorite.url) {
        this.cancleAdd()
        return
      }
      this.favorites[this.currentFavoType] = this.favorites[this.currentFavoType] && this.favorites[this.currentFavoType] || []
      const index = this.favorites[this.currentFavoType].findIndex(item => item.seq === this.favorite.seq && item.title === this.favorite.title)
      console.log(index)
      if (index !== -1) {
        this.favorites[this.currentFavoType][index] = this.favorite
      } else {
        this.favorites[this.currentFavoType].push({ ...this.favorite, seq: this.favorites[this.currentFavoType].length + 1 })
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
      this.favorite = {
        seq: '',
        title: '',
        url: '',
        img: '',
      }
    },
    removeFavorites(favorite) {
      this.favorites[this.currentFavoType].splice(this.favorites[this.currentFavoType].indexOf(favorite), 1)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    updateFavorites(favorite) {
      this.favorite = favorite
      this.showAdd = true
    },
    cancleAdd() {
      this.showAdd = false
      this.favorite = {
        seq: '',
        title: '',
        url: '',
        img: '',
      }
    },
    async getFavorites(owner) {
      if (!owner || !confirm('此操作将会覆盖您本地收藏，请确保已将本地收藏同步到云端，继续？')) return
      const file = await giteeApi.getFile('db/favorites.json', owner)
      if (!file) {
        alert('没有数据')
      } else {
        localStorage.setItem('favorites', file.content)
        this.favorites = JSON.parse(file.content)
      }
    },
    async syncToLocal() {
      const access_token = getToken()
      const userJson = getUser()
      if ((!access_token || !userJson) && confirm('此操作需要您登录gitee账号并授权，是否继续？')) {
        window.name = location.href
        location.href = getOauthUrl()
        return
      }
      const owner = userJson && JSON.parse(userJson).login
      if (!owner || !confirm('此操作将会覆盖您本地收藏夹，确定同步？')) return
      const hasRepo = await giteeApi.checkRepo(owner)
      if (!hasRepo) {
        return alert('请先初始化收藏夹')
      }
      const file = await giteeApi.getFile('db/favorites.json', owner)
      if (!file) {
        alert('您云端还没有同步数据，请先上传至云端')
      } else {
        alert(`同步成功`)
        localStorage.setItem('favorites', file.content)
        this.favorites = JSON.parse(file.content)
      }
    },
    async syncToRemote() {
      const access_token = getToken()
      const userJson = getUser()
      if (!access_token || !userJson) {
        if (!confirm('此操作需要您登录gitee账号并授权，是否继续？')) return
        window.name = location.href
        location.href = getOauthUrl()
        return
      }
      if (!confirm('确认同步到云端？')) return
      const owner = JSON.parse(userJson).login
      const hasRepo = await giteeApi.checkRepo(owner)
      if (!hasRepo) {
        return alert('请先初始化收藏夹')
      }
      const file = await giteeApi.getFile('db/favorites.json', owner)
      const content = localStorage.getItem('favorites')
      let res
      if (file) {
        res = await giteeApi.updateFile(access_token, file.path, file.sha, content, owner)
      } else {
        res = await giteeApi.addFile(access_token, 'db/favorites.json', content, owner)
      }
      if (res.status === 'OK') {
        alert(`同步成功`)
      } else {
        alert(`同步失败`)
        console.error(res.msg)
      }
    },
    async forkRepo() {
      const access_token = getToken()
      const userJson = getUser()
      if ((!access_token || !userJson) && confirm('此操作需要您登录gitee账号并授权，是否继续？')) {
        window.name = location.href
        location.href = getOauthUrl()
        return
      }
      const owner = JSON.parse(userJson).login
      const hasRepo = await giteeApi.checkRepo(owner)
      if (hasRepo) {
        return alert('已经初始化过了')
      }
      const res = await giteeApi.forkRepo(access_token, 'zclzone', 'gitee-db')
      if (res.status == 'OK') {
        return alert('初始化成功！')
      }
      alert(res.msg)
    }
  }
}

export { state }