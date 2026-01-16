// 定义懒加载插件

import {useIntersectionObserver} from "@vueuse/core";

export const lazyPlugin={
   
            mounted(el, bingding) {
                // el:指令绑定的那个元素img
                // binding:bingding.value 指令等于号后面绑定的表达式的值 图片URL
                
                const {stop}=useIntersectionObserver(
                    el,
                    ([{isIntersecting}])=>{
                       
                        if (isIntersecting) {
                            // 进入视口区域
                            el.src=bingding.value
                            // 第一次加载后就停止监听
                            stop()
                        }
                    }
                )
            },
}