<template>
  <div>
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header style="background: none;">
        <!--ant-layout-header背景色修改为none-->
        <div class="logo" />
        <a-menu theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item
            :route="i.path"
            v-for="i in tablist"
            :key="i.name"
            index="i.title"
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
            background: '#fff',
            padding: '24px',
            minHeight: '280px',
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center;">
        Ant Design ©2018 Created by Ant UED
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

  methods: {},
}
</script>

<style lang="less" scoped>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
