// 封装所有用户相关的接口

import http from "@/utils/http";

export const loginAPI = ({account, password}) => {
    return http({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

//  封装猜你喜欢接口
export const getLikeListAPI = ({ limit = 4 }) => {
  return http({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}