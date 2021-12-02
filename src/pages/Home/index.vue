<template>
  <div>
    <div style="display: flex; justify-content: space-between;">
      <div style="flex：0 0 75%;max-width: 73%;">
        <Swiper />
        <List style="margin-top: 20px;" />
      </div>

      <div style="flex: 0 0 25%; max-width: 25%;">
        <Sider></Sider>
        <SiderName style="margin-top: 24px; margin-bottom: 24px;"></SiderName>
        <SiderClas></SiderClas>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from './swiper.vue'
import List from './List/index.vue'
import Sider from './Sider/Class.vue'
import SiderName from './Sider/ClassName.vue'
import SiderClas from './Sider/Clas.vue'

export default {
  name: 'NewblogHome',
  components: {
    Swiper,
    List,
    Sider,
    SiderName,
    SiderClas,
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
