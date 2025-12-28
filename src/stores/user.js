import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia"; 
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
 

        const userInfo = ref({})

        // 2.定义获取接口数据的action函数
        const getUserInfo = async ({account, password}) => {
            const res = await loginAPI({account, password});
            userInfo.value = res.result
        }
        return{
          userInfo,getUserInfo
        }

},
{
  persist:true
})