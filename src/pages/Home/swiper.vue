<template>
  <a-carousel autoplay>
    <div v-for="(item, index) in dataTitle" :key="item.id">
      <div>{{ item.title }}</div>
    </div>
  </a-carousel>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      imgUrl: '',
      dataList: [],
    }
  },
  computed: {
    dataTitle() {
      return this.dataList.slice(0, 4)
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$bus.$on('getTarget', (payload) => {
        console.log('List数据', payload)
        this.dataList = payload
      })
    },
  },
}
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 260px;
  line-height: 260px;
  background: hsl(219, 22%, 62%);
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
