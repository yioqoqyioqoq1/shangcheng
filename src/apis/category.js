import http from "@/utils/http";

// 获取分类数据
export function getCategoryAPI(id){
    return http({
        url:'/category',
        params:{
            id
        }
    })
}