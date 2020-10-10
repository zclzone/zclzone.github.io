<template>
  <div class="favorites-container">
    <div class="sync-box">
      <div class="sync-item" @click="syncToLocal">
        <css-icon icon="icon-refresh" />
        <span>云端同步到本地</span>
      </div>
      <div class="sync-item" @click="forkRepo">
        <css-icon icon="icon-copy" />
        <span>初始化收藏夹</span>
      </div>
      <div class="sync-item" @click="syncToRemote">
        <css-icon icon="icon-refresh" />
        <span>本地同步到云端</span>
      </div>
    </div>
    <ul class="favorites-box">
      <li class="favorites-item" v-for="item in favorites" :key="item">
        <a :href="item.url" @contextmenu.prevent="currentFavo=item" target="_blank">
          <img v-if="item.img" :src="item.img" />
          <span v-else>{{item.title[0]}}</span>
        </a>
        <span>{{item.title}}</span>
        <div class="favorite-opr" v-show="item === currentFavo">
          <div class="opr-item" @click="removeFavorites(item)">删除</div>
          <div class="opr-item" @click="updateFavorites(item)">修改</div>
        </div>
      </li>
      <li class="favorites-item">
        <a href="#" @click.prevent="showAdd = true">+</a>
      </li>
    </ul>
    <div class="add-box" v-if="showAdd">
      <div class="input-item">
        <label>名称</label>
        <input type="text" v-model="favorite.title" />
      </div>
      <div class="input-item">
        <label>地址</label>
        <input type="text" v-model="favorite.url" />
      </div>
      <div class="input-item">
        <label>图标</label>
        <input type="text" v-model="favorite.img" />
      </div>
      <button @click="addFavorites">保存</button>
      <div class="close" @click="showAdd = false">
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
      favoState.currentFavo = null
    })
    return {
      ...toRefs(favoState),
    }
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
      .icon-copy {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
  .favorites-box {
    width: 100%;
    max-width: 1070px;
    height: calc(100vh - 450px);
    padding: 0 20px 25px;
    margin: 20px auto 0;
    text-align: center;
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    @media screen and (max-width: 600px) {
      & {
        height: calc(100vh - 250px);
      }
    }
    &::-webkit-scrollbar {
      display: none;
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
          border-radius: 50%;
          width: 100%;
        }
      }
      .favorite-opr {
        position: absolute;
        left: 50%;
        top: 50%;
        color: #333;
        background: #fff;
        border-radius: 8px;
        width: 70px;
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
      label {
        text-align: left;
        display: inline-block;
        width: 50px;
      }
      input {
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