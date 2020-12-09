<template>
  <div class="index_main">
    <!-- 顶部操作条 -->
    <div class="top_bar border-bottom px-3 py-2">
      <div class="d-flex">
        <Button type="primary" icon="md-cloud-upload">上传</Button>
        <Button icon="ios-folder-open">新建文件夹</Button>
        <Button icon="md-cloud-download" v-show="checkedList.length"
          >下载</Button
        >
        <Button icon="md-share" v-show="checkedList.length === 1">分享</Button>
        <Button
          icon="md-albums"
          v-show="checkedList.length === 1"
          @click="rename()"
          >重命名</Button
        >
        <Button icon="ios-trash" v-show="checkedList.length">删除</Button>

        <Input
          class="ml-auto mr-3 top_bar_input"
          search
          enter-button
          placeholder="关键字"
        />
      </div>
      <div class="d-flex align-items-center mt-3">
        <Checkbox @on-change="checkAllChange" :value="isCheckAll"
          ><span class="mx-1">全选</span></Checkbox
        >
      </div>
    </div>
    <!-- 列表部分 -->
    <div class="body_content">
      <media-list
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :index="index"
        @on-event="handleEvent"
      ></media-list>
    </div>

    <!-- 分页部分 -->
    <div class="page_bar d-flex align-items-center px-3 border-top">
      <Page :total="20" show-sizer></Page>
    </div>

    <!-- 图片浏览 -->
    <div class="d-none images" v-viewer>
      <img v-for="(src, i) in images" :key="i" :src="src" alt="" />
    </div>
  </div>
</template>

<script>
import mediaList from "@/components/media-list.vue";
export default {
  components: {
    mediaList,
  },
  data() {
    return {
      list: [
        {
          type: "dir",
          name: "项目",
          create_time: "2017-07-15 08:00",
          checked: false,
        },
        {
          type: "image",
          name: "图片1",
          url:
            "https://tse2-mm.cn.bing.net/th/id/OIP.fq3C-Dodg9sC0xlCNuB4IQHaLH?pid=Api&rs=1",
          create_time: "2017-07-15 08:00",
          checked: false,
        },
        {
          type: "image",
          name: "图片2",
          url:
            "https://tse4-mm.cn.bing.net/th/id/OIP.HBsy4_icdhBQ6TdOyNxc-AHaFO?w=200&h=141&c=7&o=5&pid=1.7",
          create_time: "2017-07-15 08:00",
          checked: false,
        },
        {
          type: "image",
          name: "图片3",
          url:
            "https://tse2-mm.cn.bing.net/th/id/OIP.A0X76qkRwbBRgkKVe4XE4QHaFj?pid=Api&rs=1",
          create_time: "2017-07-15 08:00",
          checked: false,
        },
        {
          type: "video",
          name: "短视频",
          create_time: "2017-07-15 08:00",
          checked: false,
        },
        {
          type: "text",
          name: "笔记.txt",
          create_time: "2017-07-15 08:00",
          checked: false,
        },
        {
          type: "none",
          name: "压缩包1.rar",
          create_time: "2017-07-15 08:00",
          checked: false,
        },
      ],
    };
  },
  computed: {
    // 选中列表
    checkedList() {
      return this.list.filter((item) => item.checked);
    },
    // 是否全选
    isCheckAll() {
      return this.list.length === this.checkedList.length;
    },
    // 当前页图片数组
    images() {
      return this.list
        .filter((item) => item.type === "image")
        .map((item) => (item = item.url));
    },
  },
  methods: {
    // 文件操作
    handleEvent(e) {
      switch (e.type) {
        case "delete":
          this.list.splice(e.index, 1);
          this.$Message.success("删除成功！");
          break;
        case "checked":
          this.list[e.index].checked = e.value;
          break;
        case "rename":
          this.rename(e.index);
          break;
        case "image":
          const viewer = this.$el.querySelector(".images").$viewer;
          let index = this.images.findIndex((url) => url === e.url); // 当前图片索引
          viewer.view(index); // 传入当前索引
          viewer.show();
          break;
      }
    },
    // 全选按钮
    checkAllChange(bool) {
      this.list.map((item) => (item.checked = bool));
    },
    // 重命名
    rename(index = false) {
      // 绑定对象
      let item = index === false ? this.checkedList[0] : this.list[index];
      let name = item.name;
      this.$Modal.confirm({
        render: (h) => {
          return h("Input", {
            props: {
              value: name,
              autofocus: true,
              placeholder: "请填写新名称",
            },
            on: {
              input: (val) => {
                name = val;
              },
            },
          });
        },
        onOk: () => {
          item.name = name;
          this.$Message.success("命名成功！");
        },
      });
    },
    // 浏览图片
  },
};
</script>
<style lang='scss' scoped>
.index_main {
  .top_bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 90px;
    Button {
      margin-right: 15px;
    }
    .top_bar_input {
      width: 250px;
    }
  }
  .body_content {
    position: absolute;
    overflow-y: auto;
    left: 0;
    right: 0;
    bottom: 55px;
    top: 90px;
  }
  .page_bar {
    height: 55px;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>