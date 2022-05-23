import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入需要的组件
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'
import Search from '@/views/Search/Search.vue'
// 导入文章详情组件
import ArticleDetail from '@/views/ArticleDetail/ArticleDetail.vue'
import UserEdit from '@/views/UserEdit/UserEdit.vue'
// 导入小思同学的组件页面
import Chat from '@/views/Chat/Chat.vue'
import store from '@/store/index.js'
// 导入搜索结果页
import SearchResult from '@/views/SearchResult/SearchResult.vue'

// 把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 路由规则的数组
const routes = [
  // 带有 name 名称的路由规则，叫做“命名路由”
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/',
    component: Main,
    children: [
      // path 为"空字符串"的子路由规则，叫做"默认子路由"
      {
        path: '',
        component: Home,
        name: 'home'
      },
      { path: '/user', component: User, name: 'user' }
    ]
  },
  // 搜索组件的路由规则
  { path: '/search', component: Search, name: 'search' },
  // 文章详情的路由规则
  // 文章详情的路由规则
  {
    path: '/article/:id',
    component: ArticleDetail,
    name: 'art-detail',
    props: true
  },
  // 编辑用户资料的路由规则
  { path: '/user/edit', component: UserEdit, name: 'user-edit' },
  // 小思聊天的路由规则
  { path: '/chat', component: Chat, name: 'chat' },
  // 搜索结果页
  // 搜索结果页的路由规则
  {
    path: '/search/:kw',
    component: SearchResult,
    name: 'search-result',
    props: true
  }
]

// 创建路由实例对象
const router = new VueRouter({
  routes
})
// 所有有权限页面的路径，都在这个数组之中
const pagePathArr = ['/user', '/user/edit']
// 2. 为路由的实例对象挂载全局前置守卫
router.beforeEach((to, from, next) => {
  // 访问的是有权限的页面，需要判断用户是否登录
  if (pagePathArr.indexOf(to.path) !== -1) {
    // 1. 从 store 中获取 token 的值
    //    注意：store.state.tokenInfo 要么是 {} 空对象，要么是包含 {token, refresh_token} 的对象
    const tokenStr = store.state.tokenInfo.token
    if (tokenStr) {
      // 1.1 token 有值，已登录过（操作：直接放行）
      next()
    } else {
      // 1.2 token 不存在，没有登录（操作：强制跳转到登录页）
      next(`/login?pre=${to.fullPath}`)
    }
  } else {
    // 2.2 访问的是没有权限的页面
    next()
  }
})

// 1. 将 VueRouter 本身提供的 $router.push 方法转存到常量中
const originalPush = VueRouter.prototype.push
// 2. 自定义 $router.push 方法，在内部调用原生的 originalPush 方法进行路由跳转；并通过 .catch 捕获错误
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  // 通过 .catch 捕获错误
  return originalPush.call(this, location).catch(err => err)
}

export default router
