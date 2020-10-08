import { getOauthUrl } from '@/utils/oauth-util'
import { getToken, getUser } from '@/utils/cookie-util'
import { giteeIssue } from '@/utils/gitee-issue'

const state = () => {
  return {
    favorite: {
      seq: '',
      title: '',
      url: '',
      img: '',
    },
    currentFavo: null,
    showAdd: false,
    favorites: [
      { seq: 1, title: '奇思笔记', url: 'https://qszone.com/blog', img: 'https://gitee.com/zclzone/res/raw/master/images/site_img.jpg' },
      { seq: 2, title: '奇思笔记', url: 'https://qszone.com/blog', img: '' },
      { seq: 3, title: '背景素材', url: 'https://www.hituyu.com', img: '' },
      { seq: 4, title: '有道云笔记', url: 'https://note.youdao.com/web/#/file/recent/note/58888e8e143f434b997004612ff9f543', img: '' },
      { seq: 5, title: '码力全开', url: 'https://www.maliquankai.com', img: '' },
      { seq: 6, title: '张鑫旭', url: 'https://www.zhangxinxu.com/wordpress', img: '' },
    ],
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
      if (!this.favorite || !this.favorite.title || !this.favorite.url) return
      const index = this.favorites.findIndex(item => item.seq === this.favorite.seq && item.title === this.favorite.title)
      if (index !== -1) {
        this.favorites[index] = this.favorite
      } else {
        this.favorites.push({ ...this.favorite, seq: this.favorites.length + 1 })
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
      this.favorites.splice(this.favorites.indexOf(favorite), 1)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    updateFavorites(favorite) {
      this.favorite = favorite
      this.showAdd = true
    },
    async syncToLocal() {
      const access_token = getToken()
      const userJson = getUser()
      if (!access_token || !userJson) {
        window.name = location.href
        location.href = getOauthUrl()
        return
      }
      const owner = JSON.parse(userJson).login
      const hasRepo = await giteeIssue.checkRepo(owner)
      if (!hasRepo) {
        return alert('请先初始化收藏夹')
      }
      const issue = await giteeIssue.getIssueByTitle(access_token, owner, `QSZONE-${owner}`)
      if (!issue) {
        alert('您云端还没有同步数据，请先上传至云端')
      } else {
        alert(`同步成功：${issue.number}`)
        localStorage.setItem('favorites', issue.body)
        this.favorites = JSON.parse(issue.body)
      }
    },
    async syncToRemote() {
      const access_token = getToken()
      const userJson = getUser()
      if (!access_token || !userJson) {
        window.name = location.href
        location.href = getOauthUrl()
        return
      }
      const owner = JSON.parse(userJson).login
      const hasRepo = await giteeIssue.checkRepo(owner)
      if (!hasRepo) {
        return alert('请先初始化收藏夹')
      }
      const res = await giteeIssue.addIssue(access_token, owner, `QSZONE-${owner}`, localStorage.getItem('favorites'))
      if (res.status === 'OK') {
        alert(`同步成功：${res.msg}`)
      } else {
        console.error(res.msg)
      }
    },
    async forkRepo() {
      const access_token = getToken()
      const userJson = getUser()
      if (!access_token || !userJson) {
        window.name = location.href
        location.href = getOauthUrl()
        return
      }
      const owner = JSON.parse(userJson).login
      const res = await giteeIssue.forkRepo(access_token, owner)
      alert(res.msg)
    }
  }
}

export { state }