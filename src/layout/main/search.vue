<template>
  <div class="search">
    <input type="text" placeholder="Search" />
  </div>
</template>

<style scoped lang='scss'>
.search {
  width: 80%;
  max-width: 400px;
  margin: 35px auto 0;
  input {
    height: 30px;
    width: 80%;
    display: block;
    margin: 0 auto;
    font-size: 16px;
    text-align: center;
    color: #ddd;
    background: transparent;
    box-shadow: 0 0 4px #fff;
    border-radius: 15px;
    transition: 0.5s all;
    &::-webkit-input-placeholder {
      color: #ddd;
    }
    &::-moz-placeholder {
      color: #ddd;
    }
    &:-moz-placeholder {
      color: #ddd;
    }
    &:focus {
      width: 100%;
      height: 40px;
      color: #333;
      border-radius: 20px;
      box-shadow: none;
      background: #fff;
      &::-webkit-input-placeholder {
        color: transparent;
      }
      &::-moz-placeholder {
        color: transparent;
      }
      &:-moz-placeholder {
        color: transparent;
      }
    }
  }
}
</style>