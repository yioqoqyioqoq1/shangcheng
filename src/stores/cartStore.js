// 购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";

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