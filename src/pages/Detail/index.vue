<template>
  <div>
    <div style="padding: 15px 15px; background: #fff; border-radius: 3%;">
      <div class="header">
        <div class="title">
          {{ title }}
        </div>
        <div class="info">
          <span style="margin-right: 20px;">
            更新时间:{{ update_time | dateFormat }}
          </span>
          <span>作者:{{ author }}</span>
        </div>
        <div class="border"></div>
      </div>
      <article v-html="content" class="content"></article>
      <!-- {{ content }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceJsonIndex',

  data() {
    return {
      title: '',
      content: '',
      update_time: '',
      author: '',
    }
  },

  created() {
    this.getArticle()
  },

  methods: {
    async getArticle() {
      //   console.log(this.$route.query.item.title)
      //   this.$route.query.title
      try {
        ;[this.title, this.content, this.author, this.update_time] = [
          this.$route.query.item.title,
          this.$route.query.item.content,
          this.$route.query.item.author,
          this.$route.query.item.create_time,
        ]
        // let res = await this.axios.get(`/api/blog/getBlog`, data)
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  margin: 0 5px 15px;
  text-align: center;
  .title {
    line-height: 1.2;
    text-align: center;
    padding: 0 0 20px 0;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    font-family: '微软雅黑';
  }
  .border {
    padding-top: 10px;
    border-bottom: 1px solid #e5e6eb;
  }
}
.content {
  padding: 25px;
  // background-color: #f8f8f8;
}
</style>
