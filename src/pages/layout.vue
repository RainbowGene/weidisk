<template>
  <Layout class="main">
    <Header class="bg-white px-0" style="line-height: 60px; height: 60px">
      <Menu
        mode="horizontal"
        theme="light"
        :active-name="topActive"
        @on-select="handleSelect"
        class="d-flex align-items-center"
      >
        <div style="min-width: 200px; font-size: 25px" class="text-center">
          企业网盘
        </div>
        <div class="layout-nav">
          <MenuItem
            v-for="(item, index) in topMenus"
            :key="index"
            :name="index"
          >
            <Icon :type="item.icon"></Icon>
            {{ item.title }}
          </MenuItem>
        </div>
        <div class="ml-auto mr-4">
          <Dropdown style="margin-left: 20px" placement="bottom-end">
            <a href="javascript:void(0)" class="d-flex align-items-center">
              <Avatar
                class="mr-2"
                src="https://i.loli.net/2017/08/21/599a521472424.jpg"
              />
              管理员
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>个人资料</DropdownItem>
              <DropdownItem>修改密码</DropdownItem>
              <DropdownItem>安全退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Menu>
    </Header>
    <Layout>
      <Sider class="bg-light bgc" style="position: relative" hide-trigger>
        <Menu
          theme="light"
          active-name="1"
          width="200"
          @on-select="handleSliderSelect"
          class="bgc"
        >
          <MenuGroup title="全部文件">
            <MenuItem name="1">
              <Icon type="md-document" />
              图片
            </MenuItem>
            <MenuItem name="2">
              <Icon type="md-chatbubbles" />
              视频
            </MenuItem>
            <MenuItem name="3">
              <Icon type="md-chatbubbles" />
              音乐
            </MenuItem>
            <MenuItem name="4">
              <Icon type="md-chatbubbles" />
              其他
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="其他操作">
            <MenuItem name="5">
              <Icon type="md-heart" />
              我的分享
            </MenuItem>
            <MenuItem name="6">
              <Icon type="md-leaf" />
              回收站
            </MenuItem>
          </MenuGroup>
        </Menu>

        <div
          class="footer_left bgc px-3"
          style="position: absolute; bottom: 0; left: 0; right: 0"
        >
          <Progress
            :percent="40"
            hide-info
            :stroke-color="['#108ee9', '#87d068']"
          />
          <div class="d-flex mt-2" style="justify-content: space-between">
            <small>总共:100GB</small>
            <small class="text-warning">已用:40GB</small>
          </div>
        </div>
      </Sider>
      <Content class="bg-white main_content">
        <div class="content_body">
          <router-view></router-view>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      topMenus: [
        {
          icon: "ios-paper",
          title: "网盘",
        },
        {
          icon: "ios-people",
          title: "分享",
        },
        {
          icon: "ios-construct",
          title: "更多",
        },
      ],
      topActive: 0,
    };
  },
  methods: {
    // 监听顶部导航改变
    handleSelect(e) {
      this.topActive = e;
    },
    // 监听侧边导航改变
    handleSliderSelect(e) {
      console.log(e);
    },
  },
};
</script>
<style lang='scss' scoped>
.main {
  height: 100vh;
  min-width: 645px;
  .footer_lr {
    .footer_left {
      width: 200px;
      height: 50px;
    }
  }
  .main_content {
    position: relative;
    .content_body {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
    }
  }
}

.bgc {
  background-color: #ebf0f1;
}
</style>