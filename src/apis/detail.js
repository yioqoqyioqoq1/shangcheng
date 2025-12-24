import http from "@/utils/http";

// 获取商品详情
export const getDetail = (id) => {
    return http({
        url: '/goods',
        params: {
            id
        }
    })
}