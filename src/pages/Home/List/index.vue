<template>
  <div>
    <div style="padding: 15px 15px; background: #fff; border-radius: 3%;">
      <div style="border-bottom: 1px solid green;">社区动态</div>
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="listData"
      >
        <!-- <div slot="footer">
        <b>ant design vue</b>
        footer part
      </div> -->
        <a-list-item
          slot="renderItem"
          key="item.title"
          slot-scope="item, index"
        >
          <template v-for="{ type, text } in actions" slot="actions">
            <span :key="type">
              <a-icon :type="type" style="margin-right: 8px;" />
              {{ text }}
            </span>
          </template>
          <img slot="extra" width="172" alt="logo" :src="item.logo" />
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.title }}</a>
            <a style="margin-left: 20px;" slot="title" :href="item.href">
              {{ item.author }}
            </a>
            <a-avatar slot="avatar" :src="item.avatar" />
          </a-list-item-meta>
          <span class="content" @click="goDetail(item.title)">
            {{ item.content }}
          </span>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListIndex',

  data() {
    return {
      listData: [],
      logo:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      pagination: {
        // onChange: page => {
        //   console.log(page);
        // },
        pageSize: 10,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      // for (let i = 0; i < 20; i++) {
      //   this.listData.push({
      //     href: 'https://www.antdv.com/',
      //     title: `ant design vue part ${i}`,
      //     avatar:
      //       'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      //     description:
      //       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      //     content:
      //       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      //   })
      // }
      try {
        let res = await this.axios.get(`/api/blog/getBlog`)
        const req = res.data
        this.listData = req
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    goDetail(title) {
      console.log(title)
      this.$router.push({
        path: '/Detail',
        query: {
          title: title,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
