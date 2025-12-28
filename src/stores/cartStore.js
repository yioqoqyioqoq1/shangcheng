// 购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore=defineStore("cart",()=>{
  const cartList=ref([])
  const addCart =(goods)=>{
    // 已添加过count+1 没有添加过直接push
  const item = cartList.value.find(item=>item.skuId===goods.skuId)
if(item){
  item.count++
}else{
  cartList.value.push(goods)
}
  }
  return{
    cartList,
    addCart
  }
},{
  persist:true
}
)