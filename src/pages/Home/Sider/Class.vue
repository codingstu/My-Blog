<template>
  <div>
    <div>
      <a-card class="item" hoverable>
        <img
          slot="cover"
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        <template slot="actions" class="ant-card-actions">
          <a-icon key="setting" type="setting" />
          <a-icon key="edit" type="edit" />
          <a-icon key="ellipsis" type="ellipsis" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewblogIndex',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  height: 80%;
  // height: 259px;
  border: 1px solid rgb(116, 116, 116);
  text-align: center;
}
</style>
