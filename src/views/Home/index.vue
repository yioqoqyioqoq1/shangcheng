<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
import Homepanel from './components/Homepanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />

  <!-- 测试 -->
   <Homepanel title="xinxian" sub-title="xinxian">

    <div> 
      woshichacao
    </div>
   </Homepanel>

    <Homepanel title="reniqi" sub-title="renqi">
          <div> 
      woshichacao
    </div>
   </Homepanel>
</template>