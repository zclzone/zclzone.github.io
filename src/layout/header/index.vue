<template>
  <header class="header">
    <nav class="header-nav">
      <div class="nav-brand">
        <a href="https://qszone.com">奇思站 - qszone.com</a>
      </div>
      <div class="nav-menu">
        <ul>
          <li class="menu-item">
            <a href="https://qszone.com/blog">奇思笔记</a>
          </li>
          <li class="menu-item">
            <a href="https://qszone.com/blog/#/article/关于本站">关于本站</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped lang='scss'>
.header {
  width: 100%;
  .header-nav {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    .nav-brand {
      a {
        font-size: 24px;
        color: #ddd;
      }
    }
    .nav-menu {
      font-size: 16px;
      .menu-item {
        display: inline-block;
        margin: 0 20px;
        a:hover {
          color: #ddd;
        }
      }
    }
  }
}
</style>