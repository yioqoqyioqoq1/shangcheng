import http from "@/utils/http";
/*
params: {
	orderState:0, 决定当前显示哪个字段 比如是0时显示的是全部订单。1显示代付款。2显示待发货
  page:1,
  pageSize:2
}
*/
export const getUserOrder = (params) => {
    return http({
        url:'/member/order',
        method:'GET',
        params
    })
}