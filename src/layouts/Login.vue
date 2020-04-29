<template>
  <div class="root">
    <div class="avatar">
      <a-avatar src="login.jpg" :size="128"/>
    </div>
    <div class="main-form">
      <h1>QM系统测试版</h1>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input v-decorator="[ 'userName', { rules: [{ required: true, message: '用户名不能为空~' }] },]"
                   placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-decorator="[ 'password', { rules: [{ required: true, message: '密码不能为空~' }] },]"
                  type="password"
                  placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" ghost html-type="submit" class="login-form-button">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { postLogin, cacheLoginStatus } from '@/network/api'
  export default {
    name: 'Login',
    data() {
      return {
        username: "wangyu",
        password: "123",
        errPassword: false,
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' })
    },
    mounted() {
      this.form.setFieldsValue({ ["userName"]: "wangyu" })
      this.form.setFieldsValue({ ["password"]: "123" })
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            postLogin(values.userName, values.password).then((res) =>{
              // 标记此用户已登录,用于路由守卫判断
              this.$store.commit("setLoginStatus", true);
              //存储认证token和获取时间
              cacheLoginStatus(res.data);
              this.$router.push("/home");  // 跳转到首页
            }).catch(err => {
              console.log(err);
              this.$message.info("账号或密码错误");
            })
          }
        });
      }
    },
  };
</script>
<style scoped>
  .root {
    height: 100%;
    width: 100%;
    background-color: #ADD8E6;
  }

  .avatar {
    position: absolute;
    left: 47%;
    top: 25%;
  }

  .main-form {
    height: 200px;
    width: 600px;
    padding: 30px;
    position: absolute;
    left: 33%;
    top: 33%;
  }

  .register-form-button {
    margin-left: 20px;
  }
</style>
