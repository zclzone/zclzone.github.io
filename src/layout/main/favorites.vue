<template>
  <div class="favorites-container">
    <ul class="favorites-box">
      <li class="favorites-item" v-for="item in 20" :key="item">
        <a href="https://qszone.com/blog">
          <img src="../../assets/imgs/avatar.jpg" />
        </a>
        <span>奇思博客</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.favorites-container {
  height: 450px;
  margin-top: 40px;
  width: 100%;
  overflow: hidden;
  .favorites-box {
    width: 60%;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .favorites-item {
      width: 100px;
      height: 100px;
      color: #fff;
      text-align: center;
      margin-bottom: 12px;

      &:hover {
        img {
          background: rgba(#fff, 0.5);
        }
      }
      a {
        width: 70px;
        height: 70px;
        line-height: 80px;
        margin: 8px auto;
        display: block;
        img {
          border-radius: 8px;
          padding: 20px;
          width: 100%;
          background: rgba(#fff, 0.3);
          transition: 0.5s all;
        }
      }
    }
  }
}
</style>