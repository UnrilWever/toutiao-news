import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入并安装 Vant 组件库
import Vant, { Lazyload } from 'vant'
// 切记：为了能够覆盖默认的 less 变量，这里一定要把后缀名改为 .less
import 'vant/lib/index.less'
// 导入全局样式表
import './index.less'
// 导入 dayjs 的核心模块
import dayjs from 'dayjs'

// 导入计算相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 导入中文语言包
import zh from 'dayjs/locale/zh-cn'

// 配置“计算相对时间”的插件
dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale(zh)

Vue.use(Vant)
Vue.use(Lazyload)

Vue.config.productionTip = false

// dt 参数是文章的发表时间
Vue.filter('dateFormat', dt => {
  // 调用 dayjs() 得到的是当前的时间
  // .to() 方法的返回值，是计算出来的“相对时间”
  return dayjs().to(dt)
})

new Vue({
  router,
  store, // 使用store
  render: h => h(App)
}).$mount('#app')
