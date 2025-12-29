// 结算页

import http from "@/utils/http";

// 获取结算信息
export const getCheckoutInfoAPI = () => {
    return http({
        url:'/member/order/pre'
    })
};

// 创建订单
export const createOrderAPI=(data)=>{
    return http({
        url: '/member/order',
        method: 'POST',
        data
    })
}