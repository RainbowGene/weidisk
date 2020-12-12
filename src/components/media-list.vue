<template>
  <div class="border-bottom px-3 py-2 file-list" @dblclick.stop="clickEvent">
    <Row>
      <Col span="12" class="d-flex align-items-center">
        <Checkbox
          size="small"
          :value="item.checked"
          class="mb-0 mr-3"
          @on-change="onChange"
        ></Checkbox>
        <i class="iconfont mr-3" :class="iconClass"></i>
        <small class="icon_cp">{{ item.name }}</small>

        <div class="ml-auto item_hide">
          <Tooltip content="分享" placement="bottom">
            <Icon
              type="md-share"
              color="#2db7f5"
              size="18"
              class="icon_cp"
              @click="share"
            ></Icon
          ></Tooltip>
          <Tooltip v-if="!item.isdir" content="下载" placement="bottom">
            <Icon
              type="md-cloud-download"
              color="#2db7f5"
              size="18"
              class="mx-3 icon_cp"
              @click="download"
            ></Icon>
          </Tooltip>
          <Dropdown>
            <Icon
              type="md-more"
              class="icon_cp mr-3"
              color="#2db7f5"
              size="18"
            ></Icon>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="rename">重命名</DropdownItem>
              <DropdownItem @click.native="deleteItem">删除</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>
      <Col span="6" style="height: 42px" class="d-flex align-items-center"
        >-</Col
      >
      <Col
        span="6"
        style="height: 42px"
        class="d-flex align-items-center text-secondary"
        >{{ item.created_time }}</Col
      >
    </Row>
  </div>
</template>

<script>
const icons = {
  dir: {
    icon: "icon-file-b-2",
    color: "text-warning",
  },
  image: {
    icon: "icon-file-b-6",
    color: "text-success",
  },
  video: {
    icon: "icon-file-b-9",
    color: "text-primary",
  },
  text: {
    icon: "icon-file-b-7",
    color: "text-warning",
  },
  none: {
    icon: "icon-file-b-8",
    color: "text-muted",
  },
};
export default {
  data() {
    return {};
  },
  props: {
    item: Object,
    index: [Number, String],
  },
  components: {},

  computed: {
    iconClass() {
      return icons[this.item.type].icon + " " + icons[this.item.type].color;
    },
  },

  methods: {
    clickEvent() {
      console.log(this.item);
      if (this.item.type === "image") {
        this.$emit("on-event", {
          type: "image",
          url: this.item.url,
        });
      } else {
        this.$emit("on-event", {
          type: this.item.type,
          item: this.item,
        });
      }
    },
    deleteItem() {
      this.$emit("on-event", {
        type: "delete",
        item: this.item,
        index: this.index,
      });
    },
    onChange(e) {
      this.$emit("on-event", {
        type: "checked",
        index: this.index,
        value: e,
      });
    },
    rename() {
      this.$emit("on-event", {
        type: "rename",
        index: this.index,
      });
    },
    download() {
      this.$emit("on-event", {
        type: "download",
        item: this.item,
      });
    },
    share() {
      this.$emit("on-event", {
        type: "share",
        id: this.item.id,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.file-list {
  i {
    font-size: 30px;
  }

  .icon_cp {
    cursor: pointer;
  }

  .item_hide {
    display: none;
  }
}

.file-list:hover {
  background-color: rgba(45, 140, 240, 0.15) !important;
  .item_hide {
    display: flex;
  }
}
</style>