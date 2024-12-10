<template>
  <a-modal
      v-model:open="open"
      :title="props.title"
      @cancel="modelCancel"
      :width="props.width"
      @ok="submitOk"
  >
    <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        :label-col="{ span: 4 }"
    >
      <a-form-item
          label="用户"
          name="userAccount"
          :rules="[{ required: true, message: '请输入用户账号' }]"
      >
        <a-input
            v-model:value="formState.userAccount"
            placeholder="请输入用户账号"
        />
      </a-form-item>

      <a-form-item
          label="用户密码"
          name="userPassword"
          :rules="[{ required: true, message: '请输入用户密码!' }]"
          v-if="!props.record?.id"
      >
        <a-input-password
            v-model:value="formState.userPassword"
            placeholder="请输入用户密码"
        />
      </a-form-item>
      <a-form-item label="用户角色" name="userRole">
        <a-select
            v-model:value="formState.userRole"
            placeholder="请选择用户角色"
            :rules="[{ required: true, message: '请选择用户角色!' }]"
        >
          <a-select-option value="user">普通用户</a-select-option>
          <a-select-option value="admin">管理员</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
          label="用户昵称"
          name="userName"
          :rules="[{ required: true, message: '请输入用户昵称!' }]"
      >
        <a-input
            v-model:value="formState.userName"
            placeholder="请输入用户昵称"
        />
      </a-form-item>
      <a-form-item label="用户头像" name="userAvatar">
        <PictureUploader
            biz-type="user_avatar"
            v-model:value="formState.userAvatar"
            :on-change="(url) => (formState.userAvatar = url)"
        ></PictureUploader>
      </a-form-item>
      <a-form-item label="用户简介" name="userProfile">
        <a-textarea
            v-model:value="formState.userProfile"
            placeholder="请输入用户简介"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import Api from "@/api";
import PictureUploader from "@/components/PictureUploader.vue";
import { message } from "ant-design-vue";
import type { UserUpdateReqDTO, UserVo } from '@/api/globals'

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  onCancel: () => {},
  onOk: () => {},
  width: 600,
  title: "",
});
const open = ref<boolean>(props.modelValue);
const formState = reactive<UserVo>(props.record as UserVo);

interface Props {
  modelValue: boolean;
  onOk: () => void;
  onCancel: () => void;
  title?: string;
  width?: number;
  record?: UserVo;
}

const submitOk = async () => {
  if (!props.record?.id) {
    try {
      // 添加
      const result = await Api.general.addUser({ data: formState });
      if (result.code === 0) {
        message.success("添加成功");
      } else {
        message.error("添加失败，" + result.msg);
      }
    } catch (error) {
      message.error("添加失败，服务器错误");
    }
  } else {
    // 更新
    try {
      const result = await Api.general.updateUser({
        data: formState as UserUpdateReqDTO,
      });
      if (result.code === 0) {
        message.success("更新成功");
      } else {
        message.error("更新失败，" + result.msg);
      }
    } catch (error) {
      message.error("更新失败，服务器错误");
    }
  }
  props.onOk();
};

// 监听 modelValue 的变化，并更新 open 的值
watch(
    () => props.modelValue,
    (newVal) => {
      open.value = newVal;
    },
);
watch(
    () => props.record,
    (newVal) => {
      if (newVal ?? "") {
        formState.id = newVal?.id;
        formState.userAccount = newVal?.userAccount;
        formState.userName = newVal?.userName;
        formState.userAvatar = newVal?.userAvatar;
        formState.userProfile = newVal?.userProfile;
        formState.userRole = newVal?.userRole;
      }
    },
);

const modelCancel = () => {
  open.value = false;
  props.onCancel();
};
</script>
