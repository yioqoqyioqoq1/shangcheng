import http from "@/utils/http";

// 加入购物车
export const insertCartAPI = ({skuId, count}) => {
    return http({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

// 获取最新购物车的列表
export const findNewCartListAPI=()=>{
    return http({
        url:'/member/cart'
    })
}