import { getOauthUrl } from '@/utils/oauth-util'
import { getToken, getUser } from '@/utils/cookie-util'
import { giteeApi } from '@/utils/gitee-api'

const state = () => {
  return {
    favorite: {
      seq: '',
      title: '',
      type: '',
      url: '',
      img: '',
    },
    oprOption: {
      left: 0,
      top: 0,
      isShow: false
    },
    favoMenu: [],
    showAdd: false,
    favorites: [
      {
        seq: 0,
        type: 'Folder',
        title: '常用收藏夹',
        img: '',
        files: [
          {
            seq: 0,
            type: 'Folder',
            title: '子收藏夹',
            img: '',
            files: [
              {
                seq: 0,
                type: 'Folder',
                title: '孙收藏夹',
                img: '',
                files: []
              }
            ]
          },
          {
            seq: 1,
            type: 'File',
            title: "奇思笔记",
            url: "https://qszone.com/blog",
            img: ""
          },
          {
            seq: 2,
            type: 'File',
            title: "花瓣",
            url: "https://huaban.com/",
            img: ""
          },
          {
            seq: 3,
            type: 'File',
            title: "墨刀",
            url: "https://modao.cc/dashboard/me",
            img: ""
          },
          {
            seq: 4,
            type: 'File',
            title: "Process On",
            url: "https://processon.com/diagrams",
            img: ""
          },
          {
            seq: 5,
            type: 'File',
            title: "Valine",
            url: "https://valine.js.org",
            img: ""
          }
        ]
      },
      {
        seq: 1,
        type: 'File',
        title: "奇思笔记",
        url: "https://qszone.com/blog",
        img: ""
      },
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
      if (!this.favorite || !this.favorite.title) {
        this.cancleAdd()
        return
      }
      let lastFolder = this.favorites
      for (const item of this.favoMenu) {
        lastFolder = lastFolder.find((favo) => favo.title === item).files
      }
      this.favorite.type = this.favorite.type || 'File'
      if (this.favorite.type === 'Folder' && !this.favorite.files) {
        this.favorite.files = []
      }
      const index = lastFolder.findIndex(item => item.seq === this.favorite.seq && item.title === this.favorite.title)
      if (index !== -1) {
        lastFolder[index] = this.favorite
      } else {
        lastFolder.push({ ...this.favorite, seq: lastFolder.length })
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
      this.favorite = {}
    },
    showOpr(favorite, e) {
      this.favorite = favorite
      this.oprOption.isShow = true
      this.oprOption.left = e.clientX
      this.oprOption.top = e.clientY
    },
    removeFavorites() {
      let lastFolder = this.favorites
      for (const item of this.favoMenu) {
        lastFolder = lastFolder.find((favo) => favo.title === item).files
      }
      lastFolder.splice(lastFolder.indexOf(this.favorite), 1)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    updateFavorites() {
    },
    cancleAdd() {
      this.showAdd = false
      this.favorite = {}
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