<template>
  <div>
    <a-layout class="layout">
      <a-layout-header style="background: none; padding: 0;">
        <!--ant-layout-header背景色修改为none-->

        <div class="logo">CoderZhang's Blog</div>
        <div style="float: right; padding-right: 20px;">
          <a-input-search
            placeholder="input search text"
            style="margin-right: 560px; width: 200px;"
            @search="onSearch"
          />
          <a-avatar icon="user" class="mainTop" />
          <a-button type="primary" class="mainTop" @click="login">
            登录
          </a-button>
          <!-- <a-button style="margin-right: 16px;">注册</a-button> -->
          <a-button @click="send">发布</a-button>
        </div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :style="{
            lineHeight: '64px',
            backgroundColor: '#343a40',
          }"
        >
          <a-menu-item
            :route="i.path"
            v-for="i in tablist"
            :key="i.name"
            index="i.title"
            style="margin-left: 20px;"
          >
            <router-link :to="i.path" style="display: inline;">
              {{ i.meta.title }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 20px 50px;">
        <!-- <a-breadcrumb style="margin: 16px 0;">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div
          :style="{
            padding: '24px',
            minHeight: '280px',
            maxWidth: '1140px',
            margin: '0 auto',
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center;">
        Design ©2021 Created by CoderZhang
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import router from '../router/index.js'
export default {
  name: 'NewblogMainlayout',

  data() {
    return {
      tablist: router.options.routes[0].children,
      // collapsed: false,
    }
  },

  mounted() {},

  methods: {
    async onSearch(i) {
      console.log(i)
      const data = i
      let res = await this.axios.get(`/api/blog/searchBlog?title=${data}`)
      console.log(res)
      this.$bus.$emit('getTarget', res)
    },
    send() {
      this.$router.push({
        path: '/Edit',
      })
    },
    login() {
      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.layout {
  .logo {
    width: 120px;
    height: 31px;
    // background: rgba(255, 255, 255, 0.2);
    //   margin: 16px 24px 16px 0;
    color: aliceblue;
    margin-left: 16px;
    float: left;
  }
  .mainTop {
    margin-right: 16px;
  }
}
</style>
