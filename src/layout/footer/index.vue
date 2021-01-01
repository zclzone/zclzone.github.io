<template>
  <footer class="footer">
    <p class="link">
      <a href="http://qszone.com" target="_blank">奇思站 qszone.com</a>
      |
      <a href="http://beian.miit.gov.cn/" target="_blank">赣ICP备2020015008号-1</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 10px;
  .link {
    font-size: 16px;
    line-height: 35px;
    color: #555;
    text-align: center;
    a {
      color: #555;
      margin: 0 5px;
      &:hover {
        color: rgb(0, 116, 117);
      }
    }
  }
}
</style>