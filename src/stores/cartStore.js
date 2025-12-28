// 购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { findNewCartListAPI, insertCartAPI } from "@/apis/cart";

export const useCartStore=defineStore("cart",()=>{
  const cartList=ref([])
  const userStore= useUserStore()
  const isLogin= computed(()=>userStore.userInfo.token)
  const addCart =async (goods)=>{
    if(isLogin.value){
      const {skuId,count}=goods
      // 登录之后的加入购物车逻辑
    await insertCartAPI({skuId,count})
    const res  = await findNewCartListAPI()
    cartList.value= res.result
    }else{
   const item = cartList.value.find(item=>item.skuId===goods.skuId)
    // 已添加过count+1 没有添加过直接push
    if(item){
  item.count++
    }else{
  cartList.value.push(goods)
    }
  }
    }
   
 

  const delCart =(skuId)=>{
      const cartListUpdate = cartList.value.filter((item) =>skuId!==item.skuId)
      cartList.value=cartListUpdate
  }
  const singleCheckMethod=(skuId,selected)=>{
const item = cartList.value.find(item=>item.skuId===skuId)
item.selected=selected
  }
const allCheckMethod=(selected)=>{
cartList.value.forEach(item=>item.selected=selected)
}
  const allCount= computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
  const allPrice= computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
  const isAll = computed(()=>cartList.value.every(item=>item.selected))
  // 已选择的数量
  const selectedCount= computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
  // 已选择的价格
  const selectedPrice= computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))


  return{
    cartList,
    addCart,delCart
    ,allCount,allPrice,singleCheckMethod,isAll,allCheckMethod,selectedCount
    ,selectedPrice,

  }
},{
  persist:true
}
)