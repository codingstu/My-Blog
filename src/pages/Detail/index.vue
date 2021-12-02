<template>
  <div>
    <div>
      {{}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceJsonIndex',

  data() {
    return {}
  },

  created() {
    this.getArticle()
  },

  methods: {
    async getArticle() {
      console.log(this.$route.query.title)
      //   this.$route.query.title
      const data={
          title:this.$route.query.title
      }
      try {
        let res = await this.axios.get(`/api/blog/getBlog`, data)
        console.log(res);
      } catch (error) {
          console.log(error);
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
