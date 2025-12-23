<template>
  <div>
    <header>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/category">分类</router-link>
        <router-link to="/login">登录</router-link>
      </nav>
    </header>
    

    <main>
      <router-view></router-view>
    </main>
    

    <footer>
      <p>底部信息</p>
    </footer>
  </div>
</template>