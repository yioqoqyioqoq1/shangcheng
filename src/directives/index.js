 import {lazyPlugin} from './Lazy'
 export const directivePlugin = {
  // install 方法会自动接收 app 实例
  install(app) {
    // 在这里统一注册所有指令
    app.directive('img-lazy', lazyPlugin)
  }
}
