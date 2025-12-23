
import { getCategoryAPI } from "@/apis/category"
import { onMounted, ref, watch } from 'vue';

import { onBeforeRouteUpdate, useRoute } from 'vue-router';

 export function useCategory(){
const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id=route.params.id) => {
    const res = await getCategoryAPI(id)
    console.log(res)
    categoryData.value = res.result
  }

// 组件挂载时获取数据
onMounted(()=>getCategory())
onBeforeRouteUpdate((to)=>{
  console.log("路由变化了")
  console.log(to)
  getCategory(to.params.id)
})
return {
  categoryData
}

 }
 