<template>
  <div class="addBlog">
    <div class="addMain">
      <div class="row">
        <div class="text">博客标题：</div>
        <div class="iptBox">
          <input type="text" v-model="blogObj.title" />
        </div>
      </div>

      <div class="row rowAuthor">
        <div class="text">作者：</div>
        <div class="iptBox">
          <input type="text" v-model="blogObj.author" />
        </div>
      </div>

      <!-- <div class="row">
        <div class="text">分类：</div>
        <div class="iptBox">
          <select v-model="blogObj.classify">
            <option v-for="item in classArr" :key='item.id'>{{item.classname}}</option>
          </select>
        </div>
      </div> -->

      <div class="row rowArea">
        <div class="text">博客内容：</div>
        <div class="iptBox">
          <!-- <textarea v-model="blogObj.content"></textarea> -->
           <mavon-editor ref="md" v-model="blogObj.content" :toolbars="toolbars" @imgAdd="imgAdd" @change="changeData"/>
        </div>
      </div>

      <div class="row rowArea">
        <div class="text">图片：</div>
        <div class="iptBox">
          <a-upload
            headers: {
              X-Requested-With: null
            }
            action="/api/blog/addBlog"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                点击上传
              </div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%;" :src="previewImage" />
          </a-modal>
        </div>
      </div>

      <div class="row">
        <div class="text"></div>
        <div class="iptBox">
          <button @click="onSubmit">发表博客</button>
        </div>
      </div>
    </div>
    <!-- <div class="blShowBox" v-show='blogObj.title'>
      <h1>博客预览</h1>
      <div class="row">标题：<b>{{blogObj.title}}</b></div>
      <div class="row">作者：<b>{{blogObj.author}}</b></div>
      <div class="row">时间：<b>{{meDate(new Date().getTime()/1000)}}</b></div>
      <div class="row">内容：<b>{{blogObj.content}}</b></div>
    </div> -->
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      blogObj: {
        title: "",
        author: "",
        content: "",
      },
      imgUrl: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      text: "",
      render: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  mounted() {},
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    async onSubmit() {
      //  let logoUrl= await this.handlePreview()
      // console.log(logoUrl);
      console.log(this.blogObj.content);
      const [title, author, content, logo] = [
        this.blogObj.title,
        this.blogObj.author,
        this.render,
        this.previewImage,
      ];

      // const author = this.blogObj.author
      // const content = this.blogObj.content
      this.axios
        .post(`/api/blog/addBlog`, {
          title: title,
          author: author,
          content: content,
          logo: logo,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // console.log('ss')
            // this.$message({
            //   title: '恭喜你',
            //   message: '添加成功',
            //   type: 'success',
            // })
            this.$router.push({ path: "/Home" });
          } else {
            // alert(msg);
            console.log(msg);
          }
        });
    },
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("image", $file);
      this.axios.post("/api/blog/addBlog", formdata,).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        //  $vm.$img2Url(pos, url);
        this.$refs.md.$img2Url(pos, url);
      });
    },
    changeData(value, render) {
      // value中是文本值,render是渲染出的html文本
      this.render = render;
    },
  },
};
</script>

<style lang="less" scoped>
input,
textarea,
select {
  outline: none;
}
.addBlog {
  padding: 50px 30px;
  min-height: 830px;
}
.addMain {
  padding: 0 80px;
  font-size: 18px;
  color: #333;
  .row {
    padding: 10px 0;
    display: flex;
    align-items: center;
    .text {
      width: 20%;
      text-align: right;
      padding-right: 10px;
    }
    .iptBox {
      width: 80%;
      input,
      textarea {
        width: 100%;
        padding: 10px;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 3px;
        transition: 0.3s;
        font-size: 16px;
        color: #666;
        &:focus {
          border-color: #41b883;
          box-shadow: 0 0 10px rgba(65, 184, 131, 0.3);
        }
      }
      select {
        width: 50%;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 16px;
        color: #333;
      }
      textarea {
        height: 150px;
      }
      button {
        width: 50%;
        height: 38px;
        background: #41b883;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background: #2f6f52;
        }
      }
    }
  }
  .rowArea {
    align-items: flex-start;
  }
}

.blShowBox {
  font-size: 22px;
  color: #555;
  padding: 50px 0 30px;
  text-align: center;
  border-top: 1px solid #e4e4e4;
  margin-top: 30px;
}
.blShowBox h1 {
  font-size: 30px;
  padding-bottom: 30px;
}
.blShowBox .row {
  text-align: left;
  padding: 10;
}
</style>
