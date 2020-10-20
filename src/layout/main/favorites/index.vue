<template>
  <div class="favorites-container">
    <div class="sync-box">
      <div class="sync-item" @click="getFavorites('zclzone')">
        <css-icon icon="icon-bookmark" />
        <span>奇思收藏夹</span>
      </div>
      <div class="sync-item" @click="forkRepo">
        <css-icon icon="icon-refresh" />
        <span>初始化收藏夹</span>
      </div>
      <div class="sync-item" @click="syncToLocal">
        <css-icon icon="icon-download" />
        <span>云端同步本地</span>
      </div>

      <div class="sync-item" @click="syncToRemote">
        <css-icon icon="icon-upload" />
        <span>本地同步云端</span>
      </div>
    </div>
    <div class="favorites-nav">
      <ul class="favorites-menu">
        <li class="menu-item">
          <span @click="favoMenu.length = 0">收藏栏</span>
          <css-icon icon="icon-right" v-if="favoMenu.length" />
          <css-icon icon="icon-down" v-else></css-icon>
        </li>
        <li class="menu-item" v-for="(item,index) in favoMenu" :key="index">
          <span @click="favoMenu.length = index + 1">{{item}}</span>
          <css-icon icon="icon-right" v-if="index + 1 < favoMenu.length" />
          <css-icon icon="icon-down" v-else></css-icon>
        </li>
      </ul>
      <ul class="favorites-box">
        <li class="favorites-item" v-for="(item,index) in curFavorites" :key="index">
          <a
            :href="item.url"
            @contextmenu.prevent="showOpr(item,$event)"
            target="_blank"
            v-if="item.type === 'File'"
          >
            <img v-if="item.img" :src="item.img" />
            <span v-else>{{item.title[0]}}</span>
          </a>
          <a
            href="#"
            v-else
            @click.prevent="favoMenu.push(item.title)"
            @contextmenu.prevent="showOpr(item,$event)"
          >
            <img src="@/assets/imgs/folder.png" />
          </a>
          <span>{{item.title}}</span>
        </li>
        <li class="favorites-item">
          <a href="#" @click.prevent="favorite = {};showAdd = true">+</a>
        </li>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
        <i class="blank"></i>
      </ul>
    </div>

    <div
      class="favorite-opr"
      v-show="oprOption.isShow"
      :style="`left:${oprOption.left}px;top:${oprOption.top}px`"
    >
      <div class="opr-item" @click.stop="removeFavorites">删除</div>
      <div class="opr-item" @click="showAdd=true">修改</div>
    </div>
    <div class="add-box" v-show="showAdd">
      <div class="input-item">
        <input type="radio" class="radio" name="type" v-model="favorite.type" value="Folder" />文件夹
        <input type="radio" class="radio" name="type" v-model="favorite.type" value="File" />书签
      </div>
      <div class="input-item">
        <label>名称</label>
        <input type="text" class="text" v-model="favorite.title" />
      </div>
      <div class="input-item">
        <label>地址</label>
        <input type="text" class="text" v-model="favorite.url" />
      </div>
      <div class="input-item">
        <label>图标</label>
        <input type="text" class="text" v-model="favorite.img" />
      </div>
      <button @click="addFavorites">保存</button>
      <div class="close" @click="cancleAdd">
        <css-icon icon="icon-close" />
      </div>
    </div>
  </div>
</template>

<script>
import CssIcon from '@/components/css-icon'
import { reactive, toRefs } from 'vue'
import { state } from './favorites'
export default {
  name: 'Favorites',
  setup() {
    const favoState = reactive(state())
    favoState.initFavorites()
    document.addEventListener('click', (e) => {
      e.stopPropagation()
      favoState.oprOption.isShow = false
    })
    return {
      ...toRefs(favoState),
    }
  },
  computed: {
    curFavorites() {
      let curFavorites = this.favorites
      for (const item of this.favoMenu) {
        curFavorites = curFavorites.find((favo) => favo.title === item).files
      }
      return curFavorites
    },
  },
  components: {
    CssIcon,
  },
}
</script>

<style lang="scss" scoped>
.favorites-container {
  margin-top: 20px;
  width: 100%;
  min-width: 320px;
  padding-left: 15px;
  padding-right: 15px;
  .sync-box {
    display: flex;
    justify-content: center;
    .sync-item {
      display: flex;
      padding: 0 8px;
      text-align: center;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      color: #ddd;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      .icon-refresh,
      .icon-copy,
      .icon-share,
      .icon-download,
      .icon-upload,
      .icon-bookmark {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
  .favorites-nav {
    box-shadow: 0 0 3px #fff;
    border-radius: 8px;
    width: 100%;
    max-width: 960px;
    margin: 15px auto;
    padding: 5px 10px;
    .favorites-menu {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      color: #ddd;
      margin: 5px 0;
      .menu-item {
        font-size: 14px;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
    .favorites-box {
      width: 100%;
      max-height: calc(100vh - 500px);
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-evenly;
      overflow: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      @media screen and (max-width: 600px) {
        & {
          max-height: calc(100vh - 250px);
        }
      }
      .favorites-item {
        padding: 5px;
        width: 100px;
        color: #fff;
        position: relative;
        margin-bottom: 10px;
        &:hover {
          a {
            color: #333;
            background: rgba(#fff, 0.6);
          }
        }
        &.current {
          a {
            background: rgba(#fff, 0.8);
          }
        }
        a {
          display: block;
          width: 70px;
          height: 70px;
          margin: 0 auto 10px;
          padding: 15px;
          line-height: 40px;
          font-size: 28px;
          color: #fff;
          border-radius: 8px;
          background: rgba(#fff, 0.3);
          transition: 0.6s all;
          img {
            border-radius: 5px;
            width: 100%;
          }
        }
      }
      .blank {
        width: 100px;
      }
    }
  }
  .favorite-opr {
    position: absolute;
    color: #333;
    background: #fff;
    border-radius: 8px;
    width: 70px;
    transition: all 0.1s;
    .opr-item {
      padding: 8px 15px;
      cursor: pointer;
      &:first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      &:hover {
        background: #ddd;
      }
    }
  }
  .add-box {
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 50%;
    padding: 60px 50px;
    background: #fff;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    text-align: center;
    .input-item {
      line-height: 45px;
      font-size: 16px;
      label {
        text-align: left;
        display: inline-block;
        width: 50px;
      }
      .radio {
        border: 2px solid #ddd;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin: 0 10px;
        &:checked {
          background-color: #666;
        }
      }
      .text {
        width: calc(100% - 50px);
        height: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding-left: 10px;
      }
    }
    button {
      border: none;
      outline: none;
      margin-top: 20px;
      margin-left: 50px;
      width: 150px;
      height: 30px;
      border-radius: 15px;
      background: #fff;
      border: 1px solid #ddd;
      &:hover {
        background: #ddd;
      }
    }
    .close {
      position: absolute;
      right: 25px;
      top: 25px;
      color: #ddd;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>