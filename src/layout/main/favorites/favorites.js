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
  }
}

export { state }