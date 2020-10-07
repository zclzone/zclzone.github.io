<template>
  <div class="favorites-container">
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
      <div class="close" @click="showAdd = false">X</div>
    </div>
  </div>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
.favorites-container {
  height: 450px;
  margin-top: 40px;
  width: 100%;
  overflow: hidden;
  .favorites-box {
    width: 80%;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .favorites-item {
      padding: 15px;
      color: #fff;
      text-align: center;
      position: relative;
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
      right: 30px;
      top: 30px;
      font-size: 20px;
      color: #ddd;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>