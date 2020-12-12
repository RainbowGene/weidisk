<template>
  <div class="index_main">
    <!-- 顶部操作条 -->
    <div class="top_bar border-bottom px-3 py-2">
      <div class="d-flex">
        <Button
          type="primary"
          icon="md-cloud-upload"
          @click="uploadModal = true"
          >上传</Button
        >
        <Button icon="ios-folder-open" @click="createDir">新建文件夹</Button>
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
        <Button
          icon="ios-trash"
          v-show="checkedList.length"
          @click="deleteItem(0)"
          >删除</Button
        >

        <Input
          class="ml-auto mr-3 top_bar_input"
          search
          enter-button
          placeholder="关键字"
          @on-search="search"
        />
      </div>

      <div v-show="dirs.length" style="height: 40px; margin: 0 -20px">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#" @click="handleBreadcrumb({ id: 0 })">根目录</a>
            </li>
            <li
              v-for="(item, index) in dirs"
              :key="index"
              class="breadcrumb-item active"
              aria-current="page"
            >
              <a href="#" @click="handleBreadcrumb(item)">{{ item.name }}</a>
            </li>
          </ol>
        </nav>
      </div>

      <div class="d-flex align-items-center mt-3">
        <Checkbox @on-change="checkAllChange" :value="isCheckAll"
          ><span class="mx-1">全选</span></Checkbox
        >
      </div>
    </div>
    <div class="body_content">
      <media-list
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :index="index"
        @on-event="handleEvent"
      ></media-list>

      <div
        v-if="list.length === 0 && !loading"
        style="
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          overflow-y: auto;
        "
      >
        <div class="text-center text-secondary pt-5 mt-5">暂无数据</div>
      </div>

      <div
        v-if="loading"
        style="
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          overflow-y: auto;
        "
      >
        <div class="text-center text-secondary pt-5 mt-5">加载中...</div>
      </div>
    </div>

    <!-- 分页部分 -->
    <div class="page_bar d-flex align-items-center px-3 border-top">
      <Page :total="20" show-sizer></Page>
    </div>

    <!-- 图片浏览 -->
    <div class="d-none images" v-viewer>
      <img v-for="(src, i) in images" :key="i" :src="src" alt="" />
    </div>

    <!-- 上传文件 -->
    <Modal
      v-model="uploadModal"
      title="上传文件"
      fullscreen
      footer-hide
      @on-cancel="getData"
    >
      <Upload
        :headers="{
          token,
        }"
        multiple
        type="drag"
        :action="'/api/upload?file_id=' + file_id"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>单击或拖动文件上传</p>
        </div>
      </Upload>
    </Modal>
  </div>
</template>

<script>
import mediaList from "@/components/media-list.vue";
import { mapState } from "vuex";
export default {
  components: {
    mediaList,
  },
  data() {
    return {
      list: [],
      loading: false,
      dirs: [],
      uploadModal: false,
      fileType: "all",
    };
  },
  computed: {
    ...mapState({
      token: (state) => {
        return state.user ? state.user.token : null;
      },
    }),
    // 选中列表
    checkedList() {
      return this.list.filter((item) => item.checked);
    },
    // 是否全选
    isCheckAll() {
      return (
        this.list.length === this.checkedList.length && this.list.length !== 0
      );
    },
    checkedCount() {
      return this.checkList.length;
    },
    // 当前页图片数组
    images() {
      return this.list
        .filter((item) => item.type === "image")
        .map((item) => (item = item.url));
    },
    file_id() {
      let l = this.dirs.length;
      if (l === 0) {
        return 0;
      }
      return this.dirs[l - 1].id;
    },
  },
  created() {
    let dirs = window.localStorage.getItem("dirs");
    this.dirs = dirs ? JSON.parse(dirs) : [];
    this.getData();

    this.$store.dispatch("onUpdateList", (type) => {
      this.fileType = type;
      this.getData();
    });
  },
  methods: {
    // 加载数据
    getData() {
      this.loading = true;
      this.list = [];
      this.axios
        .get(`/api/file?file_id=${this.file_id}&type=${this.fileType}`, {
          token: true,
        })
        .then((res) => {
          let list = this.formatList(res.data);
          this.list = list;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 格式化返回数据
    formatList(data) {
      return data.map((item) => {
        item.type =
          item.ext === ""
            ? "dir"
            : item.ext.substring(0, item.ext.lastIndexOf("/"));
        item.checked = false;
        return item;
      });
    },
    // 创建新文件夹
    createDir() {
      let value = "";
      this.$Modal.confirm({
        title: "新建文件夹",
        render: (h) => {
          return h("Input", {
            props: {
              value: "",
              autofocus: true,
              placeholder: "请输入文件夹名称...",
            },
            on: {
              input: (val) => {
                value = val;
              },
            },
          });
        },
        onOk: () => {
          this.axios
            .post(
              "/api/file/createdir",
              {
                file_id: this.file_id,
                name: value,
              },
              {
                token: true,
              }
            )
            .then((res) => {
              this.getData();
              this.$Message.success("创建成功");
            });
        },
      });
    },
    // 文件操作
    handleEvent(e) {
      switch (e.type) {
        case "delete":
          this.deleteItem(e.item.id);
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
        case "dir":
          this.dirs.push({
            id: e.item.id,
            name: e.item.name,
          });
          this.getData();
          window.localStorage.setItem("dirs", JSON.stringify(this.dirs));
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
              placeholder: "请填写新名称...",
            },
            on: {
              input: (val) => {
                name = val;
              },
            },
          });
        },
        onOk: () => {
          this.axios
            .post(
              "/api/file/rename",
              {
                id: item.id,
                name,
              },
              {
                token: true,
              }
            )
            .then((res) => {
              this.getData();
              this.$Message.success("修改成功");
              this.checkAllChange(false);
            });
        },
      });
    },
    // 删除
    deleteItem(id = 0) {
      this.$Modal.confirm({
        title: "提示",
        content: "是否删除选中文件？",
        onOk: () => {
          let ids = [];
          ids = id > 0 ? id : this.checkedList.map((item) => item.id).join(",");
          this.axios
            .post(
              "/api/file/delete",
              {
                ids,
              },
              {
                token: true,
              }
            )
            .then((res) => {
              this.$Message.success("删除成功");
              this.getData();
            });
        },
      });
    },
    search(e) {
      if (e == "") {
        return this.getData();
      }

      this.axios
        .get("/api/file/search?keyword=" + e, {
          token: true,
        })
        .then((res) => {
          console.log(res);
          let list = this.formatList(res.data.rows);
          this.list = list;
        });
    },
    handleBreadcrumb(item) {
      if (item.id === 0) {
        this.dirs = [];
        this.getData();
      } else {
        let i = this.dirs.findIndex((v) => v.id === item.id);
        if (i !== -1) {
          this.dirs = this.dirs.filter((v, index) => {
            return index <= i;
          });
          this.getData();
        }
      }
      window.localStorage.setItem("dirs", JSON.stringify(this.dirs));
    },
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