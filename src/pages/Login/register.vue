<template>
  <div>
    <div class="formStyle">
      <div class="title">
        <google />
        <h2>创建您的Google账号</h2>
      </div>

      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              },
            ]"
            placeholder="Username"
            v-model="userInfo.userName"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25);"
            />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input-password
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              },
            ]"
            allow-clear
            type="password"
            placeholder="Password"
            v-model="userInfo.password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25);"
            />
          </a-input-password>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input-password
            v-decorator="[
              'checkpwd',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your checkpwd!',
                  },
                ],
              },
            ]"
            allow-clear
            type="password"
            placeholder="checkpwd"
            v-model="userInfo.checkpwd"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25);"
            />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <!-- <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            Remember me
          </a-checkbox>
          <a class="login-form-forgot" href="">
            Forgot password
          </a> -->
          <div class="login-number">
            <router-link style="flex: 1;" to="/Login">
              登录已有账号
            </router-link>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              @click="doRegister"
            >
              Register
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import google from '../../style/google.vue'

export default {
  name: 'WorkspaceJsonLogin',
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  components: {
    google,
  },
  data() {
    return {
      userInfo: {
        userName: '',
        password: '',
        checkpwd: '',
      },
      show: false,
    }
  },

  mounted() {},

  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    async doRegister() {
      if (this.userInfo.userName == '') {
        alert('用户名不能为空')
        return false
      }
      if (this.userInfo.password == '') {
        alert('密码名不能为空')
        return false
      }
      if (this.userInfo.checkpwd == '') {
        alert('确认密码名不能为空')
        return false
      }
      try {
        const data = {
          username: this.userInfo.userName, // 登录名
          password: this.userInfo.password, // 登录密码
          checkpwd: this.userInfo.checkpwd, // 确认登录密码
        }
        let res = await this.axios.post('/api/user/addUser', data)
        console.log(res)
        if (res.status == 200) {
          //   this.$store.commit('setToken', res.data)
          //   localStorage.userName = this.userInfo.userName
          //   localStorage.token_expire = res.data.expire
          //   localStorage.token = res.data.token
          //   this.$notify({
          //     title: '提示信息',
          //     message: '登录成功',
          //     type: 'success',
          //   })
          this.$router.push({ path: '/Login' })
        } else {
          //   this.$notify({
          //     title: '提示信息',
          //     message: '账号或密码错误',
          //     type: 'error',
          //   })
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.formStyle {
  width: 501px;
  min-width: 450px;
  margin: 100px auto;
  padding: 48px 40px 36px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  transition: 0.2s;
  font-family: roboto, 'Noto Sans Myanmar UI', arial, sans-serif;
  .title {
    text-align: center;
  }
  .login-number {
    display: flex;
  }
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    // width: 100%;
  }
}
</style>
