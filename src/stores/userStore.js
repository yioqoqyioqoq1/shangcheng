import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia"; 
import { ref } from "vue";
import { useCartStore } from "./cartStore";


export const useUserStore = defineStore('user', () => {
 const cartStore= useCartStore()

        const userInfo = ref({})

        // 2.定义获取接口数据的action函数
        const getUserInfo = async ({account, password}) => {
            const res = await loginAPI({account, password});
            userInfo.value = res.result
        }

        // 3退出时清除用户信息
        const clearUserInfo=()=>{
          userInfo.value={}
          cartStore.clearCart()
        }
        return{
          userInfo,getUserInfo,clearUserInfo
        }

},
{
  persist:true
})