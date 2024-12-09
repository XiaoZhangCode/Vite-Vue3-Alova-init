<template>
  <div id="userLoginPage">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="right"
      :label-col="labelCol"
      :model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <a-form-item ref="userAccount" label="账号" name="userAccount">
        <a-input v-model:value="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        ref="userPassword"
        has-feedback
        label="密码"
        name="userPassword"
      >
        <a-input
          v-model:value="form.userPassword"
          type="password"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        ref="checkPassword"
        has-feedback
        label="确认密码"
        name="checkPassword"
      >
        <a-input
          v-model:value="form.checkPassword"
          type="password"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-flex justify="end">
        <router-link to="/user/login">已有账号?去登录</router-link>
      </a-flex>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import Api from "../../api";
import type { UserRegisterReqDTO } from '@/api/globals'
import { useLoginUserStore } from '@/stores/user.ts'


const labelCol = { style: { width: '100px' } };

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterReqDTO);
const router = useRouter();
const loginUserStore = useLoginUserStore();
const rules = {
  userAccount: [
      { required: true, message: "请输入账号", trigger: "change" },
      {
        min: 5,
        message: "账号长度最少5位",
        trigger: "change",
      },
  ],
  userPassword: [
    { required: true, message: "请输入密码", trigger: "change" },
    {
      min: 8,
      message: "密码长度最少8位",
      trigger: "change",
    },
  ],
  checkPassword: [
    { required: true, message: "请再次输入密码", trigger: "change" },
    {
      min: 8,
      message: "密码长度最少8位",
      trigger: "change",
    },
    {
      validator: (_rule: any, value: string) => {
        if (value !== form.userPassword) {
          return Promise.reject("两次密码不一致");
        }
        return Promise.resolve();
      },
    },
  ],
};

/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await Api.general.userRegister({ data: form });
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await loginUserStore.fetchLoginUser();
    message.success("注册成功");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.msg);
  }
};
</script>
<style scoped></style>
