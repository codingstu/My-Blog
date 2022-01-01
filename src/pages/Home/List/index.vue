<template>
  <div>
    <div style="padding: 15px 15px; background: #fff; border-radius: 3%;">
      <div style="border-bottom: 1px solid green;">社区动态</div>
      <a-spin :spinning="spinStyle">
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
            <!-- <img slot="extra" width="172" alt="logo" :src="item.logo" /> -->

            <a-list-item-meta :description="item.description">
              <a slot="title" :href="item.href">{{ item.title }}</a>

              <a style="margin-left: 20px;" slot="title" :href="item.href">
                {{ item.author }}
              </a>
              <span slot="title" @click="delData(item.title)">
                删除
              </span>
              <a-avatar slot="avatar" :src="item.avatar" />
            </a-list-item-meta>
            <span class="content" @click="goDetail(item)">
              {{ item.md }}
            </span>
          </a-list-item>
        </a-list>
      </a-spin>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListIndex',

  data() {
    return {
      listData: [],
      logo: '',
      pagination: {
        // onChange: page => {
        //   console.log(page);
        // },
        page: 0,
        pageSize: 10,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
      spinStyle: true,
    }
  },

  mounted() {
    this.getData()
    // this.searchList()
  },

  methods: {
    async getData() {
      try {
        const data = {
          page: this.page,
          pageSize: this.pageSize,
        }

        let res = await this.axios.get(`/api/blog/getBlog`, data)
        console.log(res)
        if ((status = 200)) {
          this.spinStyle = false
          const req = res.data
          this.listData = req
          this.$bus.$emit('getTarget', this.listData)
          // console.log(res)
          //模糊查询
          this.$bus.$on('getTarget', (payload) => {
            if (payload !== []) {
              console.log('List数据', payload)
              this.listData = payload.data
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async delData(item) {
      try {
        const data = { title: item }
        let res = await this.axios.post(`/api/blog/delBlog`, data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // async searchList() {
    //   this.$bus.$on('getTarget', (payload) => {
    //     console.log('List数据', payload)
    //     this.listData = payload.data
    //   })
    // },
    goDetail(item) {
      console.log(item)
      this.$router.push({
        path: '/Detail',
        query: {
          item: item,
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
