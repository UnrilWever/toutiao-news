<template>
  <div class="login-container">
    <!-- NavBar 组件：只需提供 title 标题 -->
    <van-nav-bar title="头条新闻 - 登录" fixed />
    <!-- 登录的表单 -->
    <van-form @submit="login">
      <!-- 手机号的表单项 -->
      <van-field type="tel" v-model="form.mobile" label="手机号码" placeholder="请输入手机号码" required :rules="rules.mobile"> </van-field>

      <!-- 登录密码的表单项 -->
      <van-field type="password" v-model="form.code" label="登录密码" placeholder="请输入登录密码" required :rules="rules.code"> </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/userAPI'
// 1. 按需导入辅助方法
import { mapMutations } from 'vuex'
import { Toast } from 'vant'

export default {
  // name 是当前组件的名称（建议为每个组件都指定唯一的 name 名称）
  name: 'Login',
  data() {
    return {
      // 表单的校验规则对象
      rules: {
        // 手机号的校验规则
        mobile: [
          // 必填项的校验规则
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          // 11 位手机号的校验规则
          { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'onBlur' }
        ],
        // 密码的校验规则
        code: [{ required: true, message: '请填写您的密码', trigger: 'onBlur' }]
      },
      // 登录表单的数据，最终要双向绑定到 form 这个数据对象上
      form: {
        // // 用户的手机号
        // mobile: '',
        // // 登录的密码
        // code: ''
        mobile: '13828372832',
        code: '246810'
      }
    }
  },
  methods: {
    // 2. 映射 mutations 中的方法
    ...mapMutations(['updateTokenInfo']),

    async login() {
      // // 只有当表单数据校验通过之后，才会调用此 login 函数
      // const { data: res } = await loginAPI(this.form)
      // // 判断是否登录成功了
      // if (res.message === 'OK') {
      //   // 3. 把登录成功的结果，存储到 vuex 中
      //   this.updateTokenInfo(res.data)
      //   // 4. 登录成功后，跳转到主页
      //   this.$router.push('/')
      // }
      const p = loginAPI(this.form)
      console.log('p的promise', p)
      p.then(
        ({ data: res }) => {
          if (res.message === 'OK') {
            // 3. 把登录成功的结果，存储到 vuex 中
            this.updateTokenInfo(res.data)
            // 2. 要跳转到首页
            // console.log(this.$route.query.pre)
            const navPath = this.$route.query.pre || '/'
            this.$router.replace(navPath)
          } else {
            console.log('登录出错，错误信息：', res)
          }
        },
        () => {
          Toast.clear()
          Toast.fail('登录失败')
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 46px;
}
</style>
