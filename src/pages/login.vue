<template>
  <div class="d-flex justify-content-center main">
    <div class="form-main mx-auto bg-white rounded p-3">
      <!-- 头部 -->
      <div class="d-flex flex-column align-items-center justify-center mb-4">
        <div class="d-flex align-items-center">
          <Icon type="md-briefcase" size="55" color="#2db7f5"></Icon>
          <h3 class="text-muted ml-2">企业网盘</h3>
        </div>
        <span class="text-muted small my-3">企业级网盘解决方案</span>
      </div>
      <!-- 表单 -->
      <Form ref="form" :label-width="0" :model="formItem" :rules="rules">
        <FormItem prop="username">
          <Input v-model="formItem.username" placeholder="请输入用户名" />
        </FormItem>
        <FormItem prop="password">
          <Input
            v-model="formItem.password"
            placeholder="请输入密码"
            type="password"
          />
        </FormItem>
        <div class="d-flex align-items-center mb-2 ml-1">
          <Checkbox v-model="formItem.remember">自动登录</Checkbox>
          <a href="#" class="small ml-auto">忘记密码</a>
          <span class="mx-1">|</span>
          <a href="#" class="small">注册账户</a>
        </div>
        <FormItem>
          <Button type="primary" long @click="submit">登 录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {
        username: "13026636499",
        password: "123456",
        remember: false,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // { type: "string", min: 6, message: "用户名长度不能小于6位" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // { type: "string", min: 6, message: "密码长度不能小于6位" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((val) => {
        if (!val) return;
        // 提交表单
        console.log(111);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.main {
  height: 100vh;
  background-color: #515a6e;
  .form-main {
    margin-left: auto;
    margin-right: auto;
    width: 480px;
    height: max-content;
    margin-top: 50px;
  }
}
</style>