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
    showAdd: false,
    favorites: {
      common: [
        {
          seq: 1,
          title: "奇思笔记",
          url: "https://qszone.com/blog",
          img: ""
        },
        {
          seq: 2,
          title: "背景素材",
          url: "https://www.hituyu.com",
          img: ""
        },
        {
          seq: 3,
          title: "码力全开",
          url: "https://www.maliquankai.com",
          img: "https://maliquankai.oss-cn-shenzhen.aliyuncs.com/favicon.ico"
        },
        {
          seq: 4,
          title: "张鑫旭",
          url: "https://www.zhangxinxu.com/wordpress",
          img: "https://www.zhangxinxu.com/favicon.ico"
        },
        {
          seq: 5,
          title: "果汁音乐",
          url: "http://guozhivip.com/yinyue",
          img: ""
        },
        {
          seq: 6,
          title: "30秒代码",
          url: "https://www.30secondsofcode.org/",
          img: "https://www.30secondsofcode.org/favicon-32x32.png"
        },
        {
          seq: 7,
          title: "哔哩哔哩",
          url: "https://www.bilibili.com",
          img: "https://www.bilibili.com/favicon.ico"
        },
        {
          seq: 8,
          title: "ToDoList",
          url: "https://lin-xin.gitee.io/example/notepad/",
          img: "https://lin-xin.gitee.io/favicon.ico"
        },
        {
          seq: 9,
          title: "图说设计模式",
          url: "https://design-patterns.readthedocs.io/zh_CN/latest/index.html",
          img: ""
        },
        {
          seq: 10,
          title: "花瓣",
          url: "https://huaban.com/",
          img: ""
        },
        {
          seq: 11,
          title: "墨刀",
          url: "https://modao.cc/dashboard/me",
          img: ""
        },
        {
          seq: 12,
          title: "Process On",
          url: "https://processon.com/diagrams",
          img: ""
        },
        {
          seq: 13,
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
      const index = this.favorites.common.findIndex(item => item.seq === this.favorite.seq && item.title === this.favorite.title)
      if (index !== -1) {
        this.favorites.common[index] = this.favorite
      } else {
        this.favorites.common.push({ ...this.favorite, seq: this.favorites.length + 1 })
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
      this.favorites.common.splice(this.favorites.common.indexOf(favorite), 1)
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
    // async syncToLocal() {
    //   const access_token = getToken()
    //   const userJson = getUser()
    //   if (!access_token || !userJson) {
    //     window.name = location.href
    //     location.href = getOauthUrl()
    //     return
    //   }
    //   const owner = JSON.parse(userJson).login
    //   const hasRepo = await giteeApi.checkRepo(owner)
    //   if (!hasRepo) {
    //     return alert('请先初始化收藏夹')
    //   }
    //   const file = await giteeApi.getFile('db/favorites.json', owner)
    //   if (!file) {
    //     alert('您云端还没有同步数据，请先上传至云端')
    //   } else {
    //     alert(`同步成功`)
    //     localStorage.setItem('favorites', file.content)
    //     this.favorites = JSON.parse(file.content)
    //   }
    // },
    async syncToLocal() {
      const userJson = getUser()
      let owner = userJson && JSON.parse(userJson).login || prompt('请输入gitee用户名')
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
        window.name = location.href
        location.href = getOauthUrl()
        return
      }
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
      if (!access_token || !userJson) {
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
      alert(res.msg)
    }
  }
}

export { state }