import http from "@/utils/http";

export function getCategoryLayAPI(){
  return http({
    url:"/home/category/head"
  })
}